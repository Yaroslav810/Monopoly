import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import { createGame } from "./actions/createGame";
import { getRating } from "./actions/getRating";
import { CreateGame, Rating } from "./schemes";

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
}
