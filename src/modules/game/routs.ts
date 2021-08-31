import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import {getRating} from "./actions/getRating";
import {getRoles} from "./actions/getRoles";
import { createGame } from "./actions/createGame";
import {CreateGame, Rating, Roles} from "./schemes";

export function gameRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/game/get-rating',
        method: HttpMethod.GET,
        pathVariables: Rating.PathVariables(),
        requestScheme: Rating.Request(),
        responseScheme: Rating.Response(),
        action: getRating
    })
    router.addRout({
        path: '/game/get-roles',
        method: HttpMethod.GET,
        pathVariables: Roles.PathVariables(),
        requestScheme: Roles.Request(),
        responseScheme: Roles.Response(),
        action: getRoles
    })
    router.addRout({
        path: '/game/create',
        method: HttpMethod.POST,
        pathVariables: CreateGame.PathVariables(),
        requestScheme: CreateGame.Request(),
        responseScheme: CreateGame.Response(),
        action: createGame
    })
}
