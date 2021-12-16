import {IRouter} from "../../../core/routing/IRouter"
import {SessionStorage} from "../../model/SessionStorage"
import {DataProvider} from "../../model/DataProvider"

export function playerRoutes(router: IRouter<DataProvider, SessionStorage>) {
    console.log(router)
}
