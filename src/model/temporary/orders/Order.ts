import {OrderType} from "../../../constants/OrderType";

export interface Order {
    type: OrderType
    playerId: string

    execute(): void
}
