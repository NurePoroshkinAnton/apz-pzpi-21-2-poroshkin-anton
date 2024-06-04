import { hotelApi } from "@/api/HotelApi"
import { Hotel } from "@/types/hotels/entities/Hotel"
import { Select } from "antd"
import { useEffect, useState } from "react"
import styles from "./styles.module.scss"

type HotelFilterProps = {
    setSelectedHotelId: (value: string) => void
}

export default function HotelFilter({ setSelectedHotelId }: HotelFilterProps) {
    const [hotels, setHotes] = useState<Hotel[]>([])

    useEffect(() => {
        hotelApi.getAll().then(setHotes)
    }, [])

    const hotelOptions = hotels.map((hotel) => ({
        label: hotel.name,
        value: hotel.id,
    }))

    hotelOptions.unshift({ value: "", label: "None" })

    return (
        <div className={styles["hotel-filter"]}>
            Filter by hotel:{" "}
            <Select
                options={hotelOptions}
                onChange={(hotelId) => setSelectedHotelId(hotelId)}
            />
        </div>
    )
}

