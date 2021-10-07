import {object} from "../../../core/scheme/object"
import {empty, enumerate} from "../../../core/scheme/pseudo"
import {guid, string} from "../../../core/scheme/string"
import {array} from "../../../core/scheme/array"
import {number} from "../../../core/scheme/number"
import {boolean} from "../../../core/scheme/boolean"
import {OrderResponseStatus} from "../../constants/OrderResponseStatus"
import {Team} from "../../constants/Team"

export namespace CreateOrderToMovementArmy {
    const Squad = () => object({
        movementFrom: string(),
        movementTo: string(),
        numberSquads: number(),
        isAttack: boolean()
    })

    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid(),
        order: array(Squad())
    })
    export const Response = () => object({
        status: enumerate([
            OrderResponseStatus.OK,
            OrderResponseStatus.NOT_ENOUGH_RESOURCES
        ])
    })
}

export namespace CreateOrderToPrCampaign {
    const Order = () => object({
        firstCity: string(),
        secondCity: string()
    })

    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid(),
        order: Order()
    })
    export const Response = () => object({
        status: enumerate([
            OrderResponseStatus.OK,
            OrderResponseStatus.NOT_ENOUGH_RESOURCES
        ])
    })
}

export namespace CreateOrderToConstructionRailway {
    const Order = () => object({
        railwayCompany: enumerate([
            Team.SOUTH_EASTERN_RAILWAY,
            Team.PACIFIC_RAILWAY,
            Team.SOUTH_WESTERN_RAILWAY,
            Team.NORTHERN_RAILWAY,
            Team.NEW_YORK_RAILWAY,
            Team.TEXAS_RAILWAY
        ]),
        constructionFrom: string(),
        constructionTo: string(),
        lengthOfRoad: number()
    })

    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid(),
        order: Order()
    })
    export const Response = () => object({
        status: enumerate([
            OrderResponseStatus.OK,
            OrderResponseStatus.NOT_ENOUGH_RESOURCES
        ])
    })
}

export namespace CreateOrderToConstructionWarehouse {
    const Order = () => object({
        tradingCompany: enumerate([
            Team.PRESCOTT,
            Team.WASHINGTON,
            Team.BISMARCK,
            Team.LITTLE_ROCK
        ]),
        city: string()
    })

    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid(),
        order: Order()
    })
    export const Response = () => object({
        status: enumerate([
            OrderResponseStatus.OK,
            OrderResponseStatus.NOT_ENOUGH_RESOURCES
        ])
    })
}

export namespace CreateOrderToNegotiationsWithIndians {
    const Order = () => object({
        firstTerritory: string(),
        firstIsPeaceNegotiation: boolean(),
        secondTerritory: string(),
        secondIsPeaceNegotiation: boolean()
    })

    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid(),
        order: Order()
    })
    export const Response = () => object({
        status: enumerate([
            OrderResponseStatus.OK,
            OrderResponseStatus.NOT_ENOUGH_RESOURCES
        ])
    })
}

export namespace CreateOrderToBuyingOrders {
    const Order = () => object({
        numberPrBlanks: number(),
        numberRailwayConstructionBlanks: number(),
        numberWarehouseConstructionBlanks: number(),
        numberNegotiationsWithIndiansBlanks: number()
    })

    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid(),
        order: Order()
    })
    export const Response = () => object({
        status: enumerate([
            OrderResponseStatus.OK,
            OrderResponseStatus.NOT_ENOUGH_RESOURCES
        ])
    })
}
