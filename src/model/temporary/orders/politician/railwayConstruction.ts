import {PoliticianOrder} from "./politicianOrder"
import {OrderType} from "../../../../constants/OrderType"
import {Logger} from "../../../../../core/Logger"

export interface RailwayConstruction {
    railwayCompany: number
    constructionFrom: string
    constructionTo: string
    lengthOfRoad: number
}

class RailwayConstructionPoliticalOrder implements PoliticianOrder {
    private readonly type = OrderType.RAILWAY_CONSTRUCTION
    private readonly playerId
    private readonly order: RailwayConstruction

    constructor(playerId: string, order: RailwayConstruction) {
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
        Logger.log(`Приказ для строительства ЖД от ${this.order.constructionFrom} до ${this.order.constructionTo}`)
    }
}

export function initOrderToRailwayConstructionProvider() {
    return {
        create(playerId: string, order: RailwayConstruction): RailwayConstructionPoliticalOrder {
            return new RailwayConstructionPoliticalOrder(playerId, order)
        }
    }
}
