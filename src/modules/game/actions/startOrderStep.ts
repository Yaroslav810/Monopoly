import {sendForbidden} from "../../../../core/http/httputils"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyUserAccess} from "../../_common/checks"
import {OrdersStepStart} from "../schemes"

export const startOrderStep: Action<typeof OrdersStepStart> = async ({dataProvider}, _, {playerToken}) => {
    const technicion = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technicion.team, [ Team.GAME_TECHNICIAN ])
    if (dataProvider.orders.getOrders(technicion.gameId)) {
        sendForbidden("The step of orders is already in the active state")
    }

    const orders = dataProvider.orders.start(technicion.gameId)

    return {
        remainingTimeInMs: dataProvider.orders.getRemainingTimeInMs(orders.gameId)
    }
}
