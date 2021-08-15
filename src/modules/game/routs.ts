import {IRouter} from "../../../core/routing/IRouter";
import {object} from "../../../core/scheme/object";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import { getRating } from "./actions/getRating";
import { getRatingResponseScheme } from "./builders/schemeBuilder";

export function gameRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/game/get-rating',
        method: HttpMethod.GET,
        pathVariables: object({}),
        requestScheme: object({}),
        responseScheme: getRatingResponseScheme(),
        action: getRating
    })
}
