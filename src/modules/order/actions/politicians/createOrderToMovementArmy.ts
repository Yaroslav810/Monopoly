import {Action} from "../../../_common/Action"
import {CreateOrderToMovementArmy} from "../../schemes"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden, verifyExisting} from "../../../../../core/http/httputils"
import {ResponseStatus} from "../../../../constants/ResponseStatus"

export const createOrderToMovementArmy: Action<typeof CreateOrderToMovementArmy> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])
    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))

    if (order.some(item => item.movementFrom === item.movementTo)) {
        sendForbidden("Two different cities must be specified")
    }

    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))
    if (player.numberMovementArmyBlanks) {
        verifyExisting(dataProvider.orders.createOrderToMovementArmy(politician.gameId, politician.id, order))
        player.numberMovementArmyBlanks--
        dataProvider.playersState.updatePlayerState(politician.gameId, politician.id, player)

        return {
            status: ResponseStatus.OK
        }
    }

    return {
        status: ResponseStatus.NOT_ENOUGH_RESOURCES
    }
}
