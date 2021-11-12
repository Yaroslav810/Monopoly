import {Action} from "../../../_common/Action"
import {CreateOrderToMovementArmy} from "../../schemes"
import {verifyAuthorized, verifyTeam, verifyTimer} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden} from "../../../../../core/http/httputils"
import {OrderResponseStatus} from "../../../../constants/ResponseStatuses/OrderResponseStatus"
import {GameStatus} from "../../../../infrastructure/configurations/Game"
import {StepStatus} from "../../../../model/Game"

export const createOrderToMovementArmy: Action<typeof CreateOrderToMovementArmy> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.getTeam(), [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])

    if (order.some(item => item.movementFrom === item.movementTo)) {
        sendForbidden("Two different cities must be specified")
    }

    const game = await dataProvider.game.currentPhase(politician.getGameId())
    if (!game || game.stateGame !== GameStatus.ACTIVE || game.step !== StepStatus.ORDERS) {
        sendForbidden("Sending orders is prohibited")
    }

    verifyTimer(game.remainingTimeInMs)
    const createdOrder = game.orderProvider.createOrderToMovementArmy(politician.getGameId(), politician.getId(), order)
    return (!createdOrder)
        ? {
            status: OrderResponseStatus.NOT_ENOUGH_RESOURCES
        }
        : {
            status: OrderResponseStatus.OK
        }
}
