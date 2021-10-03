import {PoliticianOrder} from "./politicianOrder";
import {Logger} from "../../../../../core/Logger";
import {OrderType} from "../../../../constants/OrderType";
import {Politician} from "../../../Politician";

export interface BuyingOrders {
    numberPrBlanks: number
    numberRailwayConstructionBlanks: number
    numberWarehouseConstructionBlanks: number
    numberNegotiationsWithIndiansBlanks: number
}

class BuyingOrdersPoliticalOrder implements PoliticianOrder {
    type = OrderType.PURCHASE_OF_NEW_ORDERS
    playerId

    order: BuyingOrders

    constructor(playerId: string, order: BuyingOrders) {
        this.playerId = playerId
        this.order = order
    }

    execute() {
        Logger.log(`Покупаю бланки приказов. Дорого!`)
    }
}

export function initOrderToBuyingOrdersProvider() {
    const sumArithmeticProgression = (num: number): number => {
        const initialCost = 10
        const increasingCost = 10

        return (2 * initialCost + increasingCost * (num - 1)) / 2 * num
    }

    const calculateCost = (order: BuyingOrders): number => {
        let count = 0
        Object.values(order)
            .forEach(number => {
                count += sumArithmeticProgression(number as number)
            })

        return count
    }

    return {
        create(playerId: string, order: BuyingOrders, politician: Politician): BuyingOrdersPoliticalOrder | null {
            const budgetUnits = calculateCost(order)
            const numberNewBlanks = 1

            if (numberNewBlanks > politician.getNumberNewBlanks() || budgetUnits > politician.getBudgetUnits()) {
                return null
            }

            politician.changeBudgetUnits(-budgetUnits)
            politician.changeNumberNewBlanks(-numberNewBlanks)

            return new BuyingOrdersPoliticalOrder(playerId, order)
        }
    }
}
