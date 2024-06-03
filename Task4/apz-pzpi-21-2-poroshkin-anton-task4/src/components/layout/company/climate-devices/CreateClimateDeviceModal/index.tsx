import { roomApi } from "@/api/RoomApi"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"
import { CreateClimateDeviceDto } from "@/types/climate-devices/dto/CreateClimateDeviceDto"
import { ClimateDeviceType } from "@/types/climate-devices/entities/ClimateDevice"
import { Room } from "@/types/rooms/entities/Room"
import { getEnumOptions } from "@/utils/getEnumOptions"
import { Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type CreateClimateDeviceModalProps = ModalProps & {
    setOpen: (value: boolean) => void
}

type RouteParams = {
    roomId: string
    hotelId: string
}

export default function CreateClimateDeviceModal({
    setOpen,
    ...modalProps
}: CreateClimateDeviceModalProps) {
    const { hotelId } = useParams<RouteParams>()
    const [form] = Form.useForm()
    const [rooms, setRooms] = useState<Room[]>([])

    useEffect(() => {
        roomApi.getAll(hotelId!).then(setRooms)
    }, [hotelId])

    const roomOptions = rooms.map((room) => ({
        value: room.id,
        label: room.number,
    }))

    const typeOptions = getEnumOptions<ClimateDeviceType>(
        ClimateDeviceType,
        (label) => label
    )

    async function handleFormSubmit(values: CreateClimateDeviceDto) {
        await climateDeviceStore.create(values)
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
            <Spin spinning={!rooms}>
                <Form<CreateClimateDeviceDto>
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    form={form}
                >
                    <Form.Item name="roomId" label="Room">
                        <Select options={roomOptions} />
                    </Form.Item>
                    <Form.Item name="type" label="Device type">
                        <Select options={typeOptions} />
                    </Form.Item>
                    <Form.Item name="address" label="Local network address">
                        <Input />
                    </Form.Item>
                    <Form.Item name="accessionNumber" label="Accession number">
                        <Input />
                    </Form.Item>
                    <Form.Item name="manufacturer" label="Manufacturer">
                        <Input />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}

