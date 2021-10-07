import {PoliticianOrder} from "./politicianOrder"
import {Logger} from "../../../../../core/Logger"
import {OrderType} from "../../../../constants/OrderType"
import {Politician} from "../../../Politician"

export interface Negotiations {
    firstTerritory: string
    firstIsPeaceNegotiation: boolean
    secondTerritory: string
    secondIsPeaceNegotiation: boolean
}

class NegotiationsWithIndiansPoliticalOrder implements PoliticianOrder {
    type = OrderType.DESTRUCTION_OF_INDIAN_SETTLEMENTS
    playerId

    order: Negotiations

    constructor(playerId: string, order: Negotiations) {
        this.playerId = playerId
        this.order = order
    }

    execute() {
        Logger.log(`Переговоры с индейцами на ${this.order.firstTerritory} и ${this.order.secondTerritory}`)
    }
}

export function initOrderToNegotiationsWithIndiansProvider() {

    return {
        create(playerId: string, order: Negotiations, politician: Politician): NegotiationsWithIndiansPoliticalOrder | null {
            const numberNegotiationsWithIndiansBlanks = 1

            if (numberNegotiationsWithIndiansBlanks > politician.getNumberNegotiationsWithIndiansBlanks()) {
                return null
            }

            politician.changeNumberNegotiationsWithIndiansBlanks(-numberNegotiationsWithIndiansBlanks)

            return new NegotiationsWithIndiansPoliticalOrder(playerId, order)
        }
    }
}
