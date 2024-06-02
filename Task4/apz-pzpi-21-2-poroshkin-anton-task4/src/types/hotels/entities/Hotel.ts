import { BaseEntity } from "@/types/common/BaseEntity"

export type Hotel = BaseEntity & {
    name: string
    address: string
}

