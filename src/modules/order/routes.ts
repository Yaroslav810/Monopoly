import {IRouter} from "../../../core/routing/IRouter"
import {HttpMethod} from "../../../core/http/HttpMethod"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"
import {
    CreateOrderToBuyingOrders,
    CreateOrderToConstructionRailway,
    CreateOrderToConstructionWarehouse,
    CreateOrderToMovementArmy,
    CreateOrderToNegotiationsWithIndians,
    CreateOrderToPrCampaign
} from "./schemes"
import {createOrderToMovementArmy} from "./actions/politicians/createOrderToMovementArmy"
import {createOrderToPrCampaign} from "./actions/politicians/createOrderToPrCampaign"
import {createOrderToConstructionRailway} from "./actions/politicians/createOrderToConstructionRailway"
import {createOrderToConstructionWarehouse} from "./actions/politicians/createOrderToConstructionWarehouse"
import {createOrderToNegotiationsWithIndians} from "./actions/politicians/createOrderToNegotiationsWithIndians"
import {createOrderToBuyingOrders} from "./actions/politicians/createOrderToBuyingOrders"


export function orderRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: "/order/movement-army",
        method: HttpMethod.POST,
        pathVariables: CreateOrderToMovementArmy.PathVariables(),
        requestScheme: CreateOrderToMovementArmy.Request(),
        responseScheme: CreateOrderToMovementArmy.Response(),
        action: createOrderToMovementArmy
    })
    router.addRout({
        path: "/order/pr-campaign",
        method: HttpMethod.POST,
        pathVariables: CreateOrderToPrCampaign.PathVariables(),
        requestScheme: CreateOrderToPrCampaign.Request(),
        responseScheme: CreateOrderToPrCampaign.Response(),
        action: createOrderToPrCampaign
    })
    router.addRout({
        path: "/order/railway-construction",
        method: HttpMethod.POST,
        pathVariables: CreateOrderToConstructionRailway.PathVariables(),
        requestScheme: CreateOrderToConstructionRailway.Request(),
        responseScheme: CreateOrderToConstructionRailway.Response(),
        action: createOrderToConstructionRailway
    })
    router.addRout({
        path: "/order/warehouse-construction",
        method: HttpMethod.POST,
        pathVariables: CreateOrderToConstructionWarehouse.PathVariables(),
        requestScheme: CreateOrderToConstructionWarehouse.Request(),
        responseScheme: CreateOrderToConstructionWarehouse.Response(),
        action: createOrderToConstructionWarehouse
    })
    router.addRout({
        path: "/order/negotiations-with-indians",
        method: HttpMethod.POST,
        pathVariables: CreateOrderToNegotiationsWithIndians.PathVariables(),
        requestScheme: CreateOrderToNegotiationsWithIndians.Request(),
        responseScheme: CreateOrderToNegotiationsWithIndians.Response(),
        action: createOrderToNegotiationsWithIndians
    })
    router.addRout({
        path: "/order/buying-orders",
        method: HttpMethod.POST,
        pathVariables: CreateOrderToBuyingOrders.PathVariables(),
        requestScheme: CreateOrderToBuyingOrders.Request(),
        responseScheme: CreateOrderToBuyingOrders.Response(),
        action: createOrderToBuyingOrders
    })
}
