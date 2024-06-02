import { BaseEntity } from "@/types/common/BaseEntity"
import { Hotel } from "@/types/hotels/entities/Hotel"

export type Room = BaseEntity & {
    number: number
    hotelId: string
    hotel: Hotel
}
