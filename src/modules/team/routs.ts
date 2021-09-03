import { HttpMethod } from "../../../core/http/HttpMethod";
import { IRouter } from "../../../core/routing/IRouter";
import { DataProvider } from "../../model/DataProvider";
import { SessionStorage } from "../../model/SessionStorage";
import { getFreeTeams } from "./actions/getFreeTeams";
import { reserveTeam } from "./actions/reserveTeam";
import { FreeTeam, ReserveTeam } from "./schemes";

export function teamRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/team/reserve',
        method: HttpMethod.POST,
        pathVariables: ReserveTeam.PathVariables(),
        requestScheme: ReserveTeam.Request(),
        responseScheme: ReserveTeam.Response(),
        action: reserveTeam
    })
    router.addRout({
        path: '/team/free/list',
        method: HttpMethod.POST,
        pathVariables: FreeTeam.PathVariables(),
        requestScheme: FreeTeam.Request(),
        responseScheme: FreeTeam.Response(),
        action: getFreeTeams
    })
}
