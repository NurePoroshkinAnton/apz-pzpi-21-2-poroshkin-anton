import { hotelStore } from "@/store/HotelStore"
import { CreateHotelDto } from "@/types/hotels/dto/CreateHotelDto"
import { Form, Input, Modal, ModalProps } from "antd"

type EditHotelModalProps = ModalProps & {
    setOpen: (value: boolean) => void
}

export default function CreateHotelModal({
    setOpen,
    ...modalProps
}: EditHotelModalProps) {
    const [form] = Form.useForm()

    async function handleFormSubmit(values: CreateHotelDto) {
        await hotelStore.create(values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title="Create hotel"
            centered
        >
            <Form<CreateHotelDto>
                layout="vertical"
                onFinish={handleFormSubmit}
                form={form}
            >
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

