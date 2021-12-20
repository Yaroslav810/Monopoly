import {IRouter} from "../../../core/routing/IRouter"
import {HttpMethod} from "../../../core/http/HttpMethod"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"
import {StartGame} from "./schemes"
import {awaitingStartGame} from "./actions/awaitingStartGame"

export function awaitingRoutes(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: "/event/start-game",
        method: HttpMethod.POST,
        pathVariables: StartGame.PathVariables(),
        requestScheme: StartGame.Request(),
        responseScheme: StartGame.Response(),
        action: awaitingStartGame
    })
}
