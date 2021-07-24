import {IRouter} from "../../../core/routing/IRouter";
import {object} from "../../../core/scheme/object";
import {string} from "../../../core/scheme/string";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {sayHello} from "./actions/sayHello";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";

export function mainRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/hello/:name',
        method: HttpMethod.GET,
        pathVariables: object({
            name: string(),
        }),
        requestScheme: object({}),
        responseScheme: object({
            message: string(),
        }),
        action: sayHello,
    })
}