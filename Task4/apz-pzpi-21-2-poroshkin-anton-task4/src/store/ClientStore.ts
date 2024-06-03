import { autorun, makeAutoObservable, runInAction } from "mobx"
import { message } from "antd"
import { Client } from "@/types/clients/entities/Client"
import { clientApi } from "@/api/ClientApi"
import { CreateClientDto } from "@/types/clients/dto/CreateClientDto"
import { UpdateClientDto } from "@/types/clients/dto/UpdateClientDto"

class ClientStore {
    constructor() {
        makeAutoObservable(this)
    }

    clients: Client[] = []
    isLoading: boolean = false
    isReady: boolean = false
    needsUpdate: boolean = false

    async fetchAll() {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            const clients = await clientApi.getAll()

            runInAction(() => {
                this.clients = clients
                this.isReady = true
            })
        } catch (error) {
            message.error(
                "An error occured while fetching clients. Please, try again later"
            )
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async create(dto: CreateClientDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await clientApi.create(dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(
                "An error occured while creating a client. Please, try again later"
            )
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }

    async update(id: string, dto: UpdateClientDto) {
        try {
            runInAction(() => {
                this.isLoading = true
            })

            await clientApi.update(id, dto)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(
                "An error occured while updating a client. Please, try again later"
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

            await clientApi.delete(id)

            runInAction(() => {
                this.needsUpdate = true
            })
        } catch (error) {
            message.error(
                "An error occured while deleting a client. Please, try again later"
            )
        } finally {
            runInAction(() => {
                this.isLoading = false
            })
        }
    }
}

export const clientStore = new ClientStore()

autorun(async () => {
    if (clientStore.needsUpdate) {
        await clientStore.fetchAll()

        runInAction(() => {
            clientStore.needsUpdate = false
        })
    }
})

