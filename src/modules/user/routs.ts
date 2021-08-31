import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import {createUser} from "./actions/createUser";
import {getUser} from "./actions/getUser";
import {CreateUser, GetUser} from "./schemes";

export function userRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/user/create',
        method: HttpMethod.POST,
        pathVariables: CreateUser.PathVariables(),
        requestScheme: CreateUser.Request(),
        responseScheme: CreateUser.Response(),
        action: createUser,
    })
    router.addRout({
        path: '/user/get/:userUuid',
        method: HttpMethod.GET,
        pathVariables: GetUser.PathVariables(),
        requestScheme: GetUser.Request(),
        responseScheme: GetUser.Response(),
        action: getUser,
    })
}
