import {IRouter} from "../../../core/routing/IRouter"
import {HttpMethod} from "../../../core/http/HttpMethod"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"
import {GameProgress, StartGame} from "./schemes"
import {awaitingStartGame} from "./actions/awaitingStartGame"
import {awaitingGameProgress} from "./actions/awaitingGameProgress"

export function awaitingRoutes(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: "/event/start-game",
        method: HttpMethod.POST,
        pathVariables: StartGame.PathVariables(),
        requestScheme: StartGame.Request(),
        responseScheme: StartGame.Response(),
        action: awaitingStartGame
    })
    router.addRout({
        path: "/event/game-progress",
        method: HttpMethod.POST,
        pathVariables: GameProgress.PathVariables(),
        requestScheme: GameProgress.Request(),
        responseScheme: GameProgress.Response(),
        action: awaitingGameProgress
    })
}
