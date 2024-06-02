import { roomApi } from "@/api/RoomApi"
import { roomStore } from "@/store/RoomStore"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { UpdateRoomDto } from "@/types/rooms/dto/UpdateRoomDto"
import { Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"

type EditRoomModalProps = ModalProps & {
    setOpen: (value: boolean) => void
    roomId: string
    hotel: Hotel
}

export default function EditRoomModal({
    roomId,
    setOpen,
    hotel,
    ...modalProps
}: EditRoomModalProps) {
    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState<UpdateRoomDto | null>(null)

    useEffect(() => {
        if (!modalProps.open) {
            return
        }

        roomApi.getById(roomId).then((values) => {
            setFormValues(values)
            form.setFieldsValue(values)
        })
    }, [form, roomId, modalProps.open])

    async function handleFormSubmit(values: UpdateRoomDto) {
        await roomStore.update(roomId, values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title="Edit room"
            centered
        >
            <Spin spinning={!formValues}>
                <Form<UpdateRoomDto>
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    form={form}
                    initialValues={{
                        hotelId: hotel.id,
                    }}
                >
                    <Form.Item name="hotelId" label="Hotel">
                        <Select
                            options={[{ value: hotel.id, label: hotel.name }]}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item name="number" label="Number">
                        <Input />
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}

