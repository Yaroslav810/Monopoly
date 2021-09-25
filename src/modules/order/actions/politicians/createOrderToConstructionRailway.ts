import {Action} from "../../../_common/Action"
import {CreateOrderToConstructionRailway} from "../../schemes"
import {ResponseStatus} from "../../../../constants/ResponseStatus"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {verifyExisting} from "../../../../../core/http/httputils"

export const createOrderToConstructionRailway: Action<typeof CreateOrderToConstructionRailway> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])
    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))

    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))
    if (player.numberRailwayConstructionBlanks) {
        verifyExisting(dataProvider.orders.createOrderToConstructionRailway(politician.gameId, politician.id, order))
        player.numberRailwayConstructionBlanks--
        dataProvider.playersState.updatePlayerState(politician.gameId, politician.id, player)

        return {
            status: ResponseStatus.OK
        }
    }

    return {
        status: ResponseStatus.NOT_ENOUGH_RESOURCES
    }
}
