import {verifyExisting} from "../../../../core/http/httputils"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyUserAccess} from "../../_common/checks"
import {GetStatusOrderStep} from "../schemes"

export const getStatusOrderStep: Action<typeof GetStatusOrderStep> = async ({dataProvider}, _, {playerToken}) => {
    const technicion = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technicion.team, [ Team.GAME_TECHNICIAN ])

    const orders = verifyExisting(dataProvider.orders.getOrders(technicion.gameId))
    
    return {
        remainingTimeInMs: dataProvider.orders.getRemainingTimeInMs(orders.gameId)
    }
}
