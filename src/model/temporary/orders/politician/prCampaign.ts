import {PoliticianOrder} from "./politicianOrder"
import {Logger} from "../../../../../core/Logger"
import {OrderType} from "../../../../constants/OrderType"
import {Politician} from "../../../Politician"

export interface PrCampaign {
    firstCity: string
    secondCity: string
}

class PrCampaignPoliticalOrder implements PoliticianOrder {
    type = OrderType.CHANGING_IMPACT_OF_PR
    playerId

    order: PrCampaign

    constructor(playerId: string, order: PrCampaign) {
        this.playerId = playerId
        this.order = order
    }

    execute() {
        Logger.log(`Проводим митинги в ${this.order.firstCity} и ${this.order.secondCity}`)
    }
}

export function initOrderToPrCampaignProvider() {
    return {
        create(playerId: string, order: PrCampaign, politician: Politician): PrCampaignPoliticalOrder | null {
            const numberPrBlanks = 1

            if (numberPrBlanks > politician.getNumberPrBlanks()) {
                return null
            }

            politician.changeNumberPrBlanks(-numberPrBlanks)

            return new PrCampaignPoliticalOrder(playerId, order)
        }
    }
}
