import {OrderType} from "../../constants/OrderType"

export interface Order {
    getType(): OrderType
    getPlayerId(): string
    execute(): void
}
