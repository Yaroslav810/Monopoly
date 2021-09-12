import {IRouter} from "../../../core/routing/IRouter"
import {HttpMethod} from "../../../core/http/HttpMethod"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"
import {createPlayer} from "./actions/createPlayer"
import {CreatePlayer, GetTeamTokens} from "./schemes"
import {getTeamTokens} from "./actions/getTeamTokens"

export function playerRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: "/player/create",
        method: HttpMethod.POST,
        pathVariables: CreatePlayer.PathVariables(),
        requestScheme: CreatePlayer.Request(),
        responseScheme: CreatePlayer.Response(),
        action: createPlayer
    }),
    router.addRout({
        path: "/player/tokens/list",
        method: HttpMethod.POST,
        pathVariables: GetTeamTokens.PathVariables(),
        requestScheme: GetTeamTokens.Request(),
        responseScheme: GetTeamTokens.Response(),
        action: getTeamTokens
    })
}
