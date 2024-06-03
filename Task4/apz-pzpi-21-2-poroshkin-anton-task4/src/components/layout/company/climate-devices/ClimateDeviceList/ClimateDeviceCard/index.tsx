import { Button, Card } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { useState } from "react"
import styles from "./styles.module.scss"
import { ClimateDevice } from "@/types/climate-devices/entities/ClimateDevice"
import EditClimateDeviceModal from "@/components/layout/company/climate-devices/ClimateDeviceList/EditClimateDeviceModal"
import { capitalize } from "lodash"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"

type ClimateDeviceCardProps = {
    climateDevice: ClimateDevice
}

export default function ClimateDeviceCard({
    climateDevice,
}: ClimateDeviceCardProps) {
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false)

    return (
        <>
            <EditClimateDeviceModal
                open={isEditModalVisible}
                setOpen={setEditModalVisible}
                climateDeviceId={climateDevice.id}
                room={climateDevice.room}
                deviceType={climateDevice.type}
            />
            <Card
                className={styles["room-card"]}
                title={`${capitalize(climateDevice.type)} ${
                    climateDevice.accessionNumber
                }`}
                actions={[
                    <Button
                        key="edit"
                        onClick={() => setEditModalVisible(true)}
                    >
                        <EditOutlined />
                    </Button>,
                    <Button
                        key="delete"
                        onClick={() =>
                            climateDeviceStore.delete(climateDevice.id)
                        }
                    >
                        <DeleteOutlined />
                    </Button>,
                ]}
            >
                <div>Manufacturer: {climateDevice.manufacturer}</div>
                <div>Type: {climateDevice.type}</div>
                <div>Status: {climateDevice.status}</div>
                <div>Network address: {climateDevice.address}</div>
            </Card>
        </>
    )
}

