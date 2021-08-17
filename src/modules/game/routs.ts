import {IRouter} from "../../../core/routing/IRouter";
import {HttpMethod} from "../../../core/http/HttpMethod";
import {SessionStorage} from "../../model/SessionStorage";
import {DataProvider} from "../../model/DataProvider";
import { any } from "../../../core/scheme/raw";
import { RatingResponse, RolesResponse } from "./schemes";
import { getRating } from "./actions/getRating";
import { getRoles } from "./actions/getRoles";

export function gameRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/game/get-rating',
        method: HttpMethod.GET,
        pathVariables: any(),
        requestScheme: any(),
        responseScheme: RatingResponse(),
        action: getRating
    })

    router.addRout({
        path: '/game/get-roles',
        method: HttpMethod.GET,
        pathVariables: any(),
        requestScheme: any(),
        responseScheme: RolesResponse(),
        action: getRoles
    })
}
