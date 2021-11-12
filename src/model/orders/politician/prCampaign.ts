import {PoliticianOrder} from "./politicianOrder"
import {OrderType} from "../../../constants/OrderType"
import {Logger} from "../../../../core/Logger"

export interface PrCampaign {
    firstCity: string
    secondCity: string
}

class PrCampaignPoliticalOrder implements PoliticianOrder {
    private readonly type = OrderType.CHANGING_IMPACT_OF_PR
    private readonly playerId
    private readonly order: PrCampaign

    constructor(playerId: string, order: PrCampaign) {
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
        Logger.log(`Проводим митинги в ${this.order.firstCity} и ${this.order.secondCity}`)
    }
}

export function initOrderToPrCampaignProvider() {
    return {
        create(playerId: string, order: PrCampaign): PrCampaignPoliticalOrder {
            return new PrCampaignPoliticalOrder(playerId, order)
        }
    }
}
