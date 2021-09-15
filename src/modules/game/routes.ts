import {IRouter} from "../../../core/routing/IRouter"
import {HttpMethod} from "../../../core/http/HttpMethod"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"
import {CreateGame, StartOrderStep, GetStatusOrderStep, GetRating} from "./schemes"
import {createGame} from "./actions/createGame"
import {getRating} from "./actions/getRating"
import {startOrderStep} from "./actions/startOrderStep"
import {getStatusOrderStep} from "./actions/getOrderStepStatus"

export function gameRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: "/game/create",
        method: HttpMethod.POST,
        pathVariables: CreateGame.PathVariables(),
        requestScheme: CreateGame.Request(),
        responseScheme: CreateGame.Response(),
        action: createGame
    }),
    router.addRout({
        path: "/game/get-rating/:gameId",
        method: HttpMethod.GET,
        pathVariables: GetRating.PathVariables(),
        requestScheme: GetRating.Request(),
        responseScheme: GetRating.Response(),
        action: getRating
    })
    router.addRout({
        path: "/game/orders_step/start",
        method: HttpMethod.POST,
        pathVariables: StartOrderStep.PathVariables(),
        requestScheme: StartOrderStep.Request(),
        responseScheme: StartOrderStep.Response(),
        action: startOrderStep
    })
    router.addRout({
        path: "/game/orders_step/status",
        method: HttpMethod.POST,
        pathVariables: GetStatusOrderStep.PathVariables(),
        requestScheme: GetStatusOrderStep.Request(),
        responseScheme: GetStatusOrderStep.Response(),
        action: getStatusOrderStep
    })
}
