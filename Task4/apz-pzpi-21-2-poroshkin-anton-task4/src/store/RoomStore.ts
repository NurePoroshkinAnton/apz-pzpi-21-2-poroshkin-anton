import { autorun, makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { Room } from "@/types/rooms/entities/Room"
import { roomApi } from "@/api/RoomApi"
import { CreateRoomDto } from "@/types/rooms/dto/CreateRoomDto"
import { UpdateRoomDto } from "@/types/rooms/dto/UpdateRoomDto"

class RoomStore {
    constructor() {
        makeAutoObservable(this)
    }

    hotelId: string = ""
    rooms: Room[] = []
    isLoading: boolean = false
    isReady: boolean = false
    needsUpdate: boolean = false

    async fetchAll() {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            const rooms = await roomApi.getAll(this.hotelId)

            runInAction(() => {
                this.rooms = rooms
                this.isReady = true
            })
        } catch (error) {
            message.error(
                "An error occured while fetching rooms. Please, try again later"
            )
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async create(dto: CreateRoomDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await roomApi.create(dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(
                "An error occured while creating a room. Please, try again later"
            )
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async update(id: string, dto: UpdateRoomDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await roomApi.update(id, dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(
                "An error occured while updating a room. Please, try again later"
            )
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async delete(id: string) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await roomApi.delete(id)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(
                "An error occured while deleting a room. Please, try again later"
            )
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    setHotelId(hotelId: string) {
        this.hotelId = hotelId
    }
}

export const roomStore = new RoomStore()

autorun(async () => {
    if (roomStore.needsUpdate) {
        await roomStore.fetchAll()
        runInAction(() => {
            roomStore.needsUpdate = false
        })
    }
})

