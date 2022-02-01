import {IRouter} from "../../../core/routing/IRouter"
import {HttpMethod} from "../../../core/http/HttpMethod"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"
import {AddPlayer, CreateGame, GetAvailable, GetStateGame, MakeDecision, MakeMove, RemovePlayer} from "./schemes"
import {createGame} from "./actions/createGame"
import {addPlayer} from "./actions/addPlayer"
import {removePlayer} from "./actions/removePlayer"
import {getAvailableGames} from "./actions/getAvailableGames"
import {getStateGame} from "./actions/getStateGame"
import {makeMove} from "./actions/makeMove"
import {makeDecision} from "./actions/makeDecision"

export function gameRoutes(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: "/game/create",
        method: HttpMethod.POST,
        pathVariables: CreateGame.PathVariables(),
        requestScheme: CreateGame.Request(),
        responseScheme: CreateGame.Response(),
        action: createGame
    })
    router.addRout({
        path: "/game/add-player",
        method: HttpMethod.POST,
        pathVariables: AddPlayer.PathVariables(),
        requestScheme: AddPlayer.Request(),
        responseScheme: AddPlayer.Response(),
        action: addPlayer
    })
    router.addRout({
        path: "/game/remove-player",
        method: HttpMethod.POST,
        pathVariables: RemovePlayer.PathVariables(),
        requestScheme: RemovePlayer.Request(),
        responseScheme: RemovePlayer.Response(),
        action: removePlayer
    })
    router.addRout({
        path: "/game/get-available",
        method: HttpMethod.GET,
        pathVariables: GetAvailable.PathVariables(),
        requestScheme: GetAvailable.Request(),
        responseScheme: GetAvailable.Response(),
        action: getAvailableGames
    })
    router.addRout({
        path: "/game/get-state-game/:gameToken",
        method: HttpMethod.GET,
        pathVariables: GetStateGame.PathVariables(),
        requestScheme: GetStateGame.Request(),
        responseScheme: GetStateGame.Response(),
        action: getStateGame
    })
    router.addRout({
        path: "/game/make-move",
        method: HttpMethod.POST,
        pathVariables: MakeMove.PathVariables(),
        requestScheme: MakeMove.Request(),
        responseScheme: MakeMove.Response(),
        action: makeMove
    })
    router.addRout({
        path: "/game/make-decision",
        method: HttpMethod.POST,
        pathVariables: MakeDecision.PathVariables(),
        requestScheme: MakeDecision.Request(),
        responseScheme: MakeDecision.Response(),
        action: makeDecision
    })
}
