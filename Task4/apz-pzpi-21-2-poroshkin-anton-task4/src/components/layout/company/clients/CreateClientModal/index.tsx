import { hotelApi } from "@/api/HotelApi"
import { roomApi } from "@/api/RoomApi"
import { clientStore } from "@/store/ClientStore"
import { CreateClientDto } from "@/types/clients/dto/CreateClientDto"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { Room } from "@/types/rooms/entities/Room"
import { DeleteOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { omit } from "lodash"
import { useEffect, useState } from "react"

type CreateClientModalProps = ModalProps & {
    setOpen: (value: boolean) => void
}

export default function CreateClientModal({
    setOpen,
    ...modalProps
}: CreateClientModalProps) {
    const [form] = Form.useForm()
    const [hotels, setHotels] = useState<Hotel[]>([])
    const [rooms, setRooms] = useState<Room[]>([])
    const [isLoadingRooms, setLoadingRooms] = useState<boolean>(false)
    const selectedHotelId = Form.useWatch("hotelId", form)
    const selectedRoomId = Form.useWatch("roomId", form)
    const selectedHotel = hotels.find((hotel) => hotel.id === selectedHotelId)

    function handleUnsetRoom() {
        form.setFieldValue("hotelId", undefined)
        form.setFieldValue("roomId", undefined)
    }

    async function handleFormSubmit(values: CreateClientDto) {
        const dto = omit(values, ["hotelId"])

        if (values.roomId === undefined) {
            dto.roomId = null as unknown as undefined
        }

        await clientStore.create(dto as CreateClientDto)
        setOpen(false)
    }

    useEffect(() => {
        hotelApi.getAll().then(setHotels)
    }, [])

    useEffect(() => {
        if (selectedHotelId) {
            if (!selectedHotel) {
                return
            }

            setLoadingRooms(true)

            roomApi.getAll(selectedHotel.id).then((rooms) => {
                setRooms(rooms)
                setLoadingRooms(false)
                form.setFieldValue("roomId", rooms[0].id)
            })
        }
    }, [selectedHotelId, hotels, selectedHotel, form])

    const hotelsOptions = hotels.map((hotel) => ({
        value: hotel.id,
        label: hotel.name,
    }))

    const roomsOptions = rooms.map((room) => ({
        value: room.id,
        label: room.number,
    }))

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title="Create room"
            centered
        >
            <Spin spinning={!hotels || isLoadingRooms}>
                <Form<CreateClientDto>
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    form={form}
                >
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item name="hotelId" label="Hotel">
                        <Select options={hotelsOptions} />
                    </Form.Item>
                    <Form.Item label="Room">
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr auto",
                                gap: "8px",
                            }}
                        >
                            <Form.Item name="roomId" noStyle>
                                <Select
                                    options={roomsOptions}
                                    disabled={!selectedHotelId}
                                />
                            </Form.Item>
                            <Button
                                disabled={!selectedRoomId}
                                onClick={handleUnsetRoom}
                            >
                                <DeleteOutlined />
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}

