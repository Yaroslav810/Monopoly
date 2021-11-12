import {PoliticianOrder} from "./politicianOrder"
import {OrderType} from "../../../constants/OrderType"
import {Logger} from "../../../../core/Logger"

export interface Negotiations {
    firstTerritory: string
    firstIsPeaceNegotiation: boolean
    secondTerritory: string
    secondIsPeaceNegotiation: boolean
}

class NegotiationsWithIndiansPoliticalOrder implements PoliticianOrder {
    private readonly type = OrderType.DESTRUCTION_OF_INDIAN_SETTLEMENTS
    private readonly playerId
    private readonly order: Negotiations

    constructor(playerId: string, order: Negotiations) {
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
        Logger.log(`Переговоры с индейцами на ${this.order.firstTerritory} и ${this.order.secondTerritory}`)
    }
}

export function initOrderToNegotiationsWithIndiansProvider() {
    return {
        create(playerId: string, order: Negotiations): NegotiationsWithIndiansPoliticalOrder {
            return new NegotiationsWithIndiansPoliticalOrder(playerId, order)
        }
    }
}
