import {IRouter} from "../../../core/routing/IRouter";
import {object} from "../../../core/scheme/object";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import { getRatingResponseScheme, getRolesResponseScheme } from "./builders/schemeBuilder";
import { getRating } from "./actions/getRating";
import { getRoles } from "./actions/getRoles";

export function gameRouts(router: IRouter<DataProvider, SessionStorage>) {
    const baseUrl: string = '/game'

    router.addRout({
        path: `${baseUrl}/get-rating`,
        method: HttpMethod.GET,
        pathVariables: object({}),
        requestScheme: object({}),
        responseScheme: getRatingResponseScheme(),
        action: getRating
    })

    router.addRout({
        path: `${baseUrl}/get-roles`,
        method: HttpMethod.GET,
        pathVariables: object({}),
        requestScheme: object({}),
        responseScheme: getRolesResponseScheme(),
        action: getRoles
    })
}
