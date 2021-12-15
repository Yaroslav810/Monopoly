import {IRouter} from "../../../core/routing/IRouter"
import {HttpMethod} from "../../../core/http/HttpMethod"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"
import {AddPlayer, CreateGame, GetAvailable, RemovePlayer} from "./schemes"
import {createGame} from "./actions/createGame"
import {addPlayer} from "./actions/addPlayer"
import {removePlayer} from "./actions/removePlayer"
import {getAvailableGames} from "./actions/getAvailableGames";

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
}
