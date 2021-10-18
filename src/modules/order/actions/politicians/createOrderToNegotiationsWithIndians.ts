import {Action} from "../../../_common/Action"
import {CreateOrderToNegotiationsWithIndians} from "../../schemes"
import {OrderResponseStatus} from "../../../../constants/ResponseStatuses/OrderResponseStatus"
import {verifyTeam, verifyTimer, verifyAuthorized} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden, verifyExisting} from "../../../../../core/http/httputils"

export const createOrderToNegotiationsWithIndians: Action<typeof CreateOrderToNegotiationsWithIndians> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])

    if (order.firstTerritory === order.secondTerritory) {
        sendForbidden("Two different territories must be specified")
    }

    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))
    verifyExisting(dataProvider.orders.getOrders(politician.gameId))
    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))

    const createdOrder = dataProvider.orders.createOrderToNegotiationsWithIndians(politician.gameId, politician.id, order, player)
    return (!createdOrder)
        ? {
            status: OrderResponseStatus.NOT_ENOUGH_RESOURCES
        }
        : {
            status: OrderResponseStatus.OK
        }
}
