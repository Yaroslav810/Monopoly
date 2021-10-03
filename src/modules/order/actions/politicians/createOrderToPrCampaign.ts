import {Action} from "../../../_common/Action"
import {CreateOrderToPrCampaign} from "../../schemes"
import {OrderResponseStatus} from "../../../../constants/OrderResponseStatus"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden, verifyExisting} from "../../../../../core/http/httputils"

export const createOrderToPrCampaign: Action<typeof CreateOrderToPrCampaign> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])

    if (order.firstCity === order.secondCity) {
        sendForbidden("Two different cities must be specified")
    }

    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))
    verifyExisting(dataProvider.orders.getOrders(politician.gameId))
    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))

    const createdOrder = dataProvider.orders.createOrderToPrCampaign(politician.gameId, politician.id, order, player)
    return (!createdOrder)
        ? {
            status: OrderResponseStatus.NOT_ENOUGH_RESOURCES
        }
        : {
            status: OrderResponseStatus.OK
        }
}
