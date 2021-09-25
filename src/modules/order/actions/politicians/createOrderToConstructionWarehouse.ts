import {Action} from "../../../_common/Action"
import {CreateOrderToConstructionWarehouse} from "../../schemes"
import {ResponseStatus} from "../../../../constants/ResponseStatus"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {verifyExisting} from "../../../../../core/http/httputils"

export const createOrderToConstructionWarehouse: Action<typeof CreateOrderToConstructionWarehouse> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])
    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))

    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))
    if (player.numberWarehouseConstructionBlanks) {
        verifyExisting(dataProvider.orders.createOrderToConstructionWarehouse(politician.gameId, politician.id, order))
        player.numberWarehouseConstructionBlanks--
        dataProvider.playersState.updatePlayerState(politician.gameId, politician.id, player)

        return {
            status: ResponseStatus.OK
        }
    }

    return {
        status: ResponseStatus.NOT_ENOUGH_RESOURCES
    }
}
