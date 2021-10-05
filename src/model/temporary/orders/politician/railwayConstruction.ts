import {PoliticianOrder} from "./politicianOrder"
import {Logger} from "../../../../../core/Logger"
import {OrderType} from "../../../../constants/OrderType"
import {Politician} from "../../../Politician"

export interface RailwayConstruction {
    railwayCompany: number
    constructionFrom: string
    constructionTo: string
    lengthOfRoad: number
}

class RailwayConstructionPoliticalOrder implements PoliticianOrder {
    type = OrderType.RAILWAY_CONSTRUCTION
    playerId

    order: RailwayConstruction

    constructor(playerId: string, order: RailwayConstruction) {
        this.playerId = playerId
        this.order = order
    }

    execute() {
        Logger.log(`Приказ для строительства ЖД от ${this.order.constructionFrom} до ${this.order.constructionTo}`)
    }
}

export function initOrderToRailwayConstructionProvider() {

    return {
        create(playerId: string, order: RailwayConstruction, politician: Politician): RailwayConstructionPoliticalOrder | null {
            const numberRailwayConstructionBlanks = 1

            if (numberRailwayConstructionBlanks > politician.getNumberRailwayConstructionBlanks()) {
                return null
            }

            politician.changeNumberRailwayConstructionBlanks(-numberRailwayConstructionBlanks)

            return new RailwayConstructionPoliticalOrder(playerId, order)
        }
    }
}
