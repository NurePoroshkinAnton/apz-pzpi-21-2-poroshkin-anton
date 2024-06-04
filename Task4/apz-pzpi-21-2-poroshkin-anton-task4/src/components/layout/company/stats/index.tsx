import PageTitle from "@/components/ui/PageTitle"
import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import HotelFilter from "@/components/layout/company/stats/HotelFilter"
import { CliamteDeviceStatsDto } from "@/types/stats/dto/ClimateDeviceStatsDto"
import { statsApi } from "@/api/StatsApi"
import { Badge, Card, Spin } from "antd"
import { ClimateDeviceStatus } from "@/types/climate-devices/entities/ClimateDevice"
import { capitalize } from "lodash"
import DeviceStatsChart from "@/components/layout/company/stats/DeviceStatsChart"
import { ManufacturerStatsDto } from "@/types/stats/dto/ManufacturerStatsDto"

const deviceStatusColors: Record<ClimateDeviceStatus, string> = {
    [ClimateDeviceStatus.Ok]: "#52c41a",
    [ClimateDeviceStatus.Warning]: "#faad14",
    [ClimateDeviceStatus.Error]: "#f54b4b",
}

export default function Stats() {
    const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null)
    const [deviceStats, setDeviceStats] =
        useState<CliamteDeviceStatsDto | null>(null)
    const [manufacturersStats, setManufacturersStats] = useState<
        ManufacturerStatsDto[]
    >([])

    useEffect(() => {
        if (!selectedHotelId) {
            statsApi.getClimateDeviceStats().then(setDeviceStats)
        } else {
            statsApi
                .getClimateDeviceStatsForHotel(selectedHotelId)
                .then(setDeviceStats)
        }

        if (manufacturersStats.length === 0) {
            statsApi.getManufacturerStats().then(setManufacturersStats)
        }
    }, [selectedHotelId])

    if (!deviceStats || !manufacturersStats) {
        return <Spin spinning size="large" fullscreen />
    }

    return (
        <div className={styles["stats-page"]}>
            <PageTitle title="Statistics" />
            <div className={styles["subtitle"]}>Climate device statistics</div>
            <div className={styles["chart-section"]}>
                <div className={styles["devices-text"]}>
                    <HotelFilter setSelectedHotelId={setSelectedHotelId} />
                    <div className={styles["device-text-item"]}>
                        <span style={{ fontWeight: "bold" }}>
                            Total number of climate devices:
                        </span>{" "}
                        <Badge
                            count={deviceStats.total}
                            color={deviceStatusColors.ok}
                        />
                    </div>
                    {deviceStats.groups.map((group) => (
                        <div
                            className={styles["device-text-item"]}
                            key={group.status}
                        >
                            {capitalize(group.status)}:{" "}
                            <Badge
                                count={group.count}
                                color={deviceStatusColors[group.status]}
                            />
                        </div>
                    ))}
                </div>
                <div className={styles["devices-chart"]}>
                    <DeviceStatsChart deviceStats={deviceStats} />
                </div>
            </div>
            <div className={styles["manufacturers-section"]}>
                <div className={styles["subtitle"]}>
                    Worst manufacturers rankings
                </div>
                <div className={styles["worst-manufacturers-list"]}>
                    {manufacturersStats.map((item) => (
                        <Card title={item.manufacturer}>
                            <div>
                                Number of climate devices with error status:{" "}
                                <Badge
                                    showZero
                                    count={item.errorCount}
                                    color={deviceStatusColors.error}
                                />
                            </div>
                            <div>
                                Number of climate devices with warning status:{" "}
                                <Badge
                                    showZero
                                    count={item.warningCount}
                                    color={deviceStatusColors.warning}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

