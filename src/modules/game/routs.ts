import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import { CreateGame, OrdersStepStart, OrdersStepStatus, Rating } from "./schemes";
import { createGame } from "./actions/createGame";
import { getRating } from "./actions/getRating";
import { startOrderStep } from "./actions/startOrderStep";
import { getOrderStepStatus } from "./actions/getOrderStepStatus";

export function gameRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/game/create',
        method: HttpMethod.POST,
        pathVariables: CreateGame.PathVariables(),
        requestScheme: CreateGame.Request(),
        responseScheme: CreateGame.Response(),
        action: createGame
    }),
    router.addRout({
        path: '/game/get-rating',
        method: HttpMethod.GET,
        pathVariables: Rating.PathVariables(),
        requestScheme: Rating.Request(),
        responseScheme: Rating.Response(),
        action: getRating
    })
    router.addRout({
        path: '/game/orders_step/start',
        method: HttpMethod.POST,
        pathVariables: OrdersStepStart.PathVariables(),
        requestScheme: OrdersStepStart.Request(),
        responseScheme: OrdersStepStart.Response(),
        action: startOrderStep
    })
    router.addRout({
        path: '/game/orders_step/status',
        method: HttpMethod.POST,
        pathVariables: OrdersStepStatus.PathVariables(),
        requestScheme: OrdersStepStatus.Request(),
        responseScheme: OrdersStepStatus.Response(),
        action: getOrderStepStatus
    })
}
