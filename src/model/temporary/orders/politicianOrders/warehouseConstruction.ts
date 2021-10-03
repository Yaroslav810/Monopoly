import {PoliticianOrder} from "./politicianOrder"
import {Logger} from "../../../../../core/Logger"
import {OrderType} from "../../../../constants/OrderType"
import {Politician} from "../../../Politician"

export interface WarehouseConstruction {
    tradingCompany: number
    city: string
}

class WarehouseConstructionPoliticalOrder implements PoliticianOrder {
    type = OrderType.TRADING
    playerId

    order: WarehouseConstruction

    constructor(playerId: string, order: WarehouseConstruction) {
        this.playerId = playerId
        this.order = order
    }

    execute() {
        Logger.log(`Приказ на строительство склада в ${this.order.city}`)
    }
}

export function initOrderToWarehouseConstructionProvider() {

    return {
        create(playerId: string, order: WarehouseConstruction, politician: Politician): WarehouseConstructionPoliticalOrder | null {
            const numberWarehouseConstructionBlanks = 1

            if (numberWarehouseConstructionBlanks > politician.getNumberWarehouseConstructionBlanks()) {
                return null
            }

            politician.changeNumberWarehouseConstructionBlanks(-numberWarehouseConstructionBlanks)

            return new WarehouseConstructionPoliticalOrder(playerId, order)
        }
    }
}
