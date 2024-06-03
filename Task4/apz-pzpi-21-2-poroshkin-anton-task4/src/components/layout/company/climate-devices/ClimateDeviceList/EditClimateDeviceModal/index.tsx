import { cliamteDeviceApi } from "@/api/ClimateDeviceApi"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"
import { UpdateClimateDeviceDto } from "@/types/climate-devices/dto/UpdateClimateDeviceDto"
import { ClimateDeviceType } from "@/types/climate-devices/entities/ClimateDevice"
import { Room } from "@/types/rooms/entities/Room"
import { Form, Input, Modal, ModalProps, Select, Spin } from "antd"
import { useEffect, useState } from "react"

type EditClimateDeviceModalProps = ModalProps & {
    setOpen: (value: boolean) => void
    climateDeviceId: string
    room: Room
    deviceType: ClimateDeviceType
}

export default function EditClimateDeviceModal({
    climateDeviceId,
    setOpen,
    room,
    deviceType,
    ...modalProps
}: EditClimateDeviceModalProps) {
    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState<UpdateClimateDeviceDto | null>(
        null
    )

    useEffect(() => {
        if (!modalProps.open) {
            return
        }

        cliamteDeviceApi.getById(climateDeviceId).then((values) => {
            console.log(values)
            setFormValues(values)
            form.setFieldsValue(values)
        })
    }, [form, climateDeviceId, modalProps.open])

    async function handleFormSubmit(values: UpdateClimateDeviceDto) {
        await climateDeviceStore.update(climateDeviceId, values)
        setOpen(false)
    }

    return (
        <Modal
            {...modalProps}
            onCancel={() => setOpen(false)}
            onOk={() => form.submit()}
            title="Edit cliamte device"
            centered
        >
            <Spin spinning={!formValues}>
                <Form<UpdateClimateDeviceDto>
                    form={form}
                    layout="vertical"
                    onFinish={handleFormSubmit}
                    initialValues={{
                        roomId: room.id,
                        type: deviceType,
                    }}
                >
                    <Form.Item name="roomId" label="Room">
                        <Select
                            options={[{ value: room.id, label: room.number }]}
                            disabled
                        />
                    </Form.Item>
                    <Form.Item name="type" label="Type">
                        <Select
                            options={[
                                {
                                    value: deviceType,
                                    label: deviceType,
                                },
                            ]}
                            disabled
                        />
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

