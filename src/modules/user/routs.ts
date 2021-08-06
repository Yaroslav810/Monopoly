import {IRouter} from "../../../core/routing/IRouter";
import {object} from "../../../core/scheme/object";
import {guid, string} from "../../../core/scheme/string";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import {createUser} from "./actions/createUser";
import {any} from "../../../core/scheme/raw";
import {getUser} from "./actions/getUser";

export function userRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/user/create',
        method: HttpMethod.POST,
        pathVariables: object({}),
        requestScheme: object({
            name: string(),
        }),
        responseScheme: object({
            id: guid(),
            name: string(),
        }),
        action: createUser,
    })
    router.addRout({
        path: '/user/get/:userId',
        method: HttpMethod.GET,
        pathVariables: object({
            userId: guid()
        }),
        requestScheme: any(),
        responseScheme: object({
            id: guid(),
            name: string(),
        }),
        action: getUser,
    })
}
