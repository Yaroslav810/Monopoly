import {Action} from "../../../_common/Action"
import {CreateOrderToNegotiationsWithIndians} from "../../schemes"
import {ResponseStatus} from "../../../../constants/ResponseStatus"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden, verifyExisting} from "../../../../../core/http/httputils"

export const createOrderToNegotiationsWithIndians: Action<typeof CreateOrderToNegotiationsWithIndians> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])
    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))

    if (order.firstTerritory === order.secondTerritory) {
        sendForbidden("Two different territories must be specified")
    }

    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))
    if (player.numberNegotiationsWithIndiansBlanks) {
        verifyExisting(dataProvider.orders.createOrderToNegotiationsWithIndians(politician.gameId, politician.id, order))
        player.numberNegotiationsWithIndiansBlanks--
        dataProvider.playersState.updatePlayerState(politician.gameId, politician.id, player)

        return {
            status: ResponseStatus.OK
        }
    }

    return {
        status: ResponseStatus.NOT_ENOUGH_RESOURCES
    }
}
