import {Action} from "../../../_common/Action"
import {CreateOrderToConstructionWarehouse} from "../../schemes"
import {OrderResponseStatus} from "../../../../constants/OrderResponseStatus"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {verifyExisting} from "../../../../../core/http/httputils"

export const createOrderToConstructionWarehouse: Action<typeof CreateOrderToConstructionWarehouse> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])

    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))
    verifyExisting(dataProvider.orders.getOrders(politician.gameId))
    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))

    const createdOrder = dataProvider.orders.createOrderToConstructionWarehouse(politician.gameId, politician.id, order, player)
    return (!createdOrder)
        ? {
            status: OrderResponseStatus.NOT_ENOUGH_RESOURCES
        }
        : {
            status: OrderResponseStatus.OK
        }
}
