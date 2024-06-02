import PageTitle from "@/components/ui/PageTitle"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { hotelStore } from "@/store/HotelStore"
import { Button, Spin } from "antd"
import { observer } from "mobx-react-lite"
import { PlusOutlined } from "@ant-design/icons"
import { roomStore } from "@/store/RoomStore"
import { useParams } from "react-router-dom"
import CreateRoomModal from "@/components/layout/company/rooms/CreateRoomModal"
import RoomList from "@/components/layout/company/rooms/RoomsList"

type RouteParams = {
    hotelId: string
}

function RoomsComponent() {
    const [isCreateModalVisible, setCreateModalVisible] =
        useState<boolean>(false)
    const { isLoading, isReady } = hotelStore
    const { hotelId } = useParams<RouteParams>()

    useEffect(() => {
        roomStore.setHotelId(hotelId!)

        if (!isReady) {
            roomStore.fetchAll()
        }
    }, [isReady, hotelId])

    if (isLoading) {
        return <Spin spinning fullscreen size="large" />
    }

    return (
        <div className={styles["rooms-page"]}>
            <CreateRoomModal
                open={isCreateModalVisible}
                setOpen={(value) => setCreateModalVisible(value)}
            />
            <div className={styles["title-wrapper"]}>
                <PageTitle title="Rooms" />
                <Button
                    shape="circle"
                    onClick={() => setCreateModalVisible(true)}
                >
                    <PlusOutlined />
                </Button>
            </div>
            <RoomList />
        </div>
    )
}

const Rooms = observer(RoomsComponent)
export default Rooms

