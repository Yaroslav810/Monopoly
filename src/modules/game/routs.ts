import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import { createGame } from "./actions/createGame";
import { CreateGame } from "./schemes";

export function gameRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/game/create',
        method: HttpMethod.POST,
        pathVariables: CreateGame.PathVariables(),
        requestScheme: CreateGame.Request(),
        responseScheme: CreateGame.Response(),
        action: createGame
    })
}
