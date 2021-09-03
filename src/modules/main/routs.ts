import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {sayHello} from "./actions/sayHello";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import {SayHello} from "./schemes";

export function mainRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/hello/:name',
        method: HttpMethod.GET,
        pathVariables: SayHello.PathVariables(),
        requestScheme: SayHello.Request(),
        responseScheme: SayHello.Response(),
        action: sayHello,
    })
}
