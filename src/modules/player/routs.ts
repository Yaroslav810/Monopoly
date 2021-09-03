import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import {createPlayer} from "./actions/createPlayer";
import {CreatePlayer} from "./schemes";

export function playerRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/player/create',
        method: HttpMethod.POST,
        pathVariables: CreatePlayer.PathVariables(),
        requestScheme: CreatePlayer.Request(),
        responseScheme: CreatePlayer.Response(),
        action: createPlayer
    })
}
