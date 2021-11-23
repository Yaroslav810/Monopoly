import {PoliticianOrder} from "./politicianOrder"
import {OrderType} from "../../../constants/OrderType"
import {Logger} from "../../../../core/Logger"

export interface WarehouseConstruction {
    tradingCompany: number
    city: string
}

class WarehouseConstructionPoliticalOrder implements PoliticianOrder {
    private readonly type = OrderType.TRADING
    private readonly playerId
    private readonly order: WarehouseConstruction

    constructor(playerId: string, order: WarehouseConstruction) {
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
        Logger.log(`Приказ на строительство склада в ${this.order.city}`)
    }
}

export function initOrderToWarehouseConstructionProvider() {
    return {
        create(playerId: string, order: WarehouseConstruction): WarehouseConstructionPoliticalOrder {
            return new WarehouseConstructionPoliticalOrder(playerId, order)
        }
    }
}
