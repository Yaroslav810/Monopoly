import {Action} from "../../../_common/Action"
import {CreateOrderToPrCampaign} from "../../schemes"
import {OrderResponseStatus} from "../../../../constants/ResponseStatuses/OrderResponseStatus"
import {verifyTeam, verifyTimer, verifyAuthorized} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden} from "../../../../../core/http/httputils"
import {GameStatus} from "../../../../infrastructure/configurations/Game"
import {StepStatus} from "../../../../model/Game"

export const createOrderToPrCampaign: Action<typeof CreateOrderToPrCampaign> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.getTeam(), [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])

    if (order.firstCity === order.secondCity) {
        sendForbidden("Two different cities must be specified")
    }

    const game = await dataProvider.game.currentPhase(politician.getGameId())
    if (!game || game.stateGame !== GameStatus.ACTIVE || game.step !== StepStatus.ORDERS) {
        sendForbidden("Sending orders is prohibited")
    }

    verifyTimer(game.remainingTimeInMs)
    const createdOrder = game.orderProvider.createOrderToPrCampaign(politician.getGameId(), politician.getId(), order)
    return (!createdOrder)
        ? {
            status: OrderResponseStatus.NOT_ENOUGH_RESOURCES
        }
        : {
            status: OrderResponseStatus.OK
        }
}
