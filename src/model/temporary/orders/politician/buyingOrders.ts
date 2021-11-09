import {PoliticianOrder} from "./politicianOrder"
import {OrderType} from "../../../../constants/OrderType"
import {Logger} from "../../../../../core/Logger"

export interface BuyingOrders {
    numberPrBlanks: number
    numberRailwayConstructionBlanks: number
    numberWarehouseConstructionBlanks: number
    numberNegotiationsWithIndiansBlanks: number
}

class BuyingOrdersPoliticalOrder implements PoliticianOrder {
    private readonly type = OrderType.PURCHASE_OF_NEW_ORDERS
    private readonly playerId
    private readonly order: BuyingOrders

    constructor(playerId: string, order: BuyingOrders) {
        this.playerId = playerId
        this.order = order
    }

    getType(): OrderType {
        return this.type
    }

    getPlayerId(): string {
        return this.playerId
    }

    execute() {
        Logger.log(`Покупаю бланки приказов. Дорого! Pr: ${this.order.numberPrBlanks} и другие`)
    }
}

export function initOrderToBuyingOrdersProvider() {
    return {
        create(playerId: string, order: BuyingOrders): BuyingOrdersPoliticalOrder {
            return new BuyingOrdersPoliticalOrder(playerId, order)
        }
    }
}
