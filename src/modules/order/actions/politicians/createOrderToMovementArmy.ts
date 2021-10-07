import {Action} from "../../../_common/Action"
import {CreateOrderToMovementArmy} from "../../schemes"
import {verifyTeam, verifyTimer, verifyAuthorized} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden, verifyExisting} from "../../../../../core/http/httputils"
import {OrderResponseStatus} from "../../../../constants/OrderResponseStatus"

export const createOrderToMovementArmy: Action<typeof CreateOrderToMovementArmy> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])

    if (order.some(item => item.movementFrom === item.movementTo)) {
        sendForbidden("Two different cities must be specified")
    }

    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))
    verifyExisting(dataProvider.orders.getOrders(politician.gameId))
    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))

    const createdOrder = dataProvider.orders.createOrderToMovementArmy(politician.gameId, politician.id, order, player)
    return (!createdOrder)
        ? {
            status: OrderResponseStatus.NOT_ENOUGH_RESOURCES
        }
        : {
            status: OrderResponseStatus.OK
        }
}
