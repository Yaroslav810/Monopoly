import { HttpMethod } from "../../../core/http/HttpMethod";
import { IRouter } from "../../../core/routing/IRouter";
import { DataProvider } from "../../model/DataProvider";
import { SessionStorage } from "../../model/SessionStorage";
import { reserveTeam } from "./actions/reserveTeam";
import { ReserveTeam } from "./schemes";

export function teamRouts(router: IRouter<DataProvider, SessionStorage>) {
    router.addRout({
        path: '/team/reserve',
        method: HttpMethod.POST,
        pathVariables: ReserveTeam.PathVariables(),
        requestScheme: ReserveTeam.Request(),
        responseScheme: ReserveTeam.Response(),
        action: reserveTeam
    })
}
