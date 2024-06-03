import ClimateDeviceList from "@/components/layout/company/climate-devices/ClimateDeviceList"
import CreateClimateDeviceModal from "@/components/layout/company/climate-devices/CreateClimateDeviceModal"
import PageTitle from "@/components/ui/PageTitle"
import { climateDeviceStore } from "@/store/ClimateDeviceStore"
import { PlusOutlined } from "@ant-design/icons"
import { Button, Spin } from "antd"
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./styles.module.scss"

type RouteParams = {
    hotelId: string
    roomId: string
}

function ClimateDevicesComponent() {
    const [isCreateModalVisible, setCreateModalVisible] =
        useState<boolean>(false)
    const { isLoading, isReady } = climateDeviceStore
    const { roomId } = useParams<RouteParams>()

    useEffect(() => {
        climateDeviceStore.setRoomId(roomId!)

        if (!isReady) {
            climateDeviceStore.fetchAll()
        }
    }, [isReady, roomId])

    if (isLoading) {
        return <Spin spinning fullscreen size="large" />
    }

    return (
        <div className={styles["rooms-page"]}>
            <CreateClimateDeviceModal
                open={isCreateModalVisible}
                setOpen={(value) => setCreateModalVisible(value)}
            />
            <div className={styles["title-wrapper"]}>
                <PageTitle title="Climate devices" />
                <Button
                    shape="circle"
                    onClick={() => setCreateModalVisible(true)}
                >
                    <PlusOutlined />
                </Button>
            </div>
            <ClimateDeviceList />
        </div>
    )
}

const ClimateDevices = observer(ClimateDevicesComponent)
export default ClimateDevices

