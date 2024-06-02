import { hotelApi } from "@/api/HotelApi"
import { hotelStore } from "@/store/HotelStore"
import { UpdateHotelDto } from "@/types/hotels/dto/UpdateHotelDto"
import { Form, Input, Modal, ModalProps, Spin } from "antd"
import { useEffect, useState } from "react"

type EditHotelModalProps = ModalProps & {
    setOpen: (value: boolean) => void
    hotelId: string
}

export default function EditHotelModal({
    hotelId,
    setOpen,
    ...modalProps
}: EditHotelModalProps) {
    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState<UpdateHotelDto | null>(null)

    useEffect(() => {
        if (!modalProps.open) {
            return
        }

        hotelApi.getById(hotelId).then((values) => {
            setFormValues(values)
            form.setFieldsValue(values)
        })
    }, [form, hotelId, modalProps.open])

    async function handleFormSubmit(values: UpdateHotelDto) {
        await hotelStore.update(hotelId, values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title="Edit hotel"
            centered
        >
            <Spin spinning={!formValues}>
                <Form<UpdateHotelDto>
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
            </Spin>
        </Modal>
    )
}

