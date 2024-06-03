import { hotelApi } from "@/api/HotelApi"
import { roomStore } from "@/store/RoomStore"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { CreateRoomDto } from "@/types/rooms/dto/CreateRoomDto"
import { Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type EditRoomModalProps = ModalProps & {
    setOpen: (value: boolean) => void
}

type RouteParams = {
    hotelId: string
}

export default function CreateRoomModal({
    setOpen,
    ...modalProps
}: EditRoomModalProps) {
    const { hotelId } = useParams<RouteParams>()
    const [form] = Form.useForm()
    const [hotels, setHotels] = useState<Hotel[]>([])

    useEffect(() => {
        hotelApi.getAll().then(setHotels)
    }, [hotelId])

    const hotelsOptions = hotels.map((hotel) => ({
        value: hotel.id,
        label: hotel.name,
    }))

    async function handleFormSubmit(values: CreateRoomDto) {
        await roomStore.create(values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title="Create room"
            centered
        >
            <Spin spinning={!hotels}>
                <Form<CreateRoomDto>
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    form={form}
                >
                    <Form.Item name="hotelId" label="Hotel">
                        <Select options={hotelsOptions} />
                    </Form.Item>
                    <Form.Item name="number" label="Number">
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}

