import {HttpMethod} from "../../../core/http/HttpMethod"
import {IRouter} from "../../../core/routing/IRouter"
import {DataProvider} from "../../model/DataProvider"
import {SessionStorage} from "../../model/SessionStorage"
import {getFreeTeams} from "./actions/getFreeTeams"
import {getOccupiedTeams} from "./actions/getOccupiedTeams"
import {releasingTeam} from "./actions/releasingTeam"
import {reserveTeam} from "./actions/reserveTeam"
import {FreeTeams, OccupiedTeams, ReleasingTeam, ReserveTeam} from "./schemes"

export function teamRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: "/team/reserve",
        method: HttpMethod.POST,
        pathVariables: ReserveTeam.PathVariables(),
        requestScheme: ReserveTeam.Request(),
        responseScheme: ReserveTeam.Response(),
        action: reserveTeam
    })
    router.addRout({
        path: "/team/free/list",
        method: HttpMethod.POST,
        pathVariables: FreeTeams.PathVariables(),
        requestScheme: FreeTeams.Request(),
        responseScheme: FreeTeams.Response(),
        action: getFreeTeams
    })
    router.addRout({
        path: "/team/get-occupied-teams/:gameId",
        method: HttpMethod.GET,
        pathVariables: OccupiedTeams.PathVariables(),
        requestScheme: OccupiedTeams.Request(),
        responseScheme: OccupiedTeams.Response(),
        action: getOccupiedTeams
    })
    router.addRout({
        path: "/team/releasing",
        method: HttpMethod.POST,
        pathVariables: ReleasingTeam.PathVariables(),
        requestScheme: ReleasingTeam.Request(),
        responseScheme: ReleasingTeam.Response(),
        action: releasingTeam
    })
}
