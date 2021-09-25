import {Action} from "../../../_common/Action"
import {CreateOrderToPrCampaign} from "../../schemes"
import {ResponseStatus} from "../../../../constants/ResponseStatus"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {sendForbidden, verifyExisting} from "../../../../../core/http/httputils"

export const createOrderToPrCampaign: Action<typeof CreateOrderToPrCampaign> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])
    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))

    if (order.firstCity === order.secondCity) {
        sendForbidden("Two different cities must be specified")
    }

    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))
    if (player.numberPrBlanks) {
        verifyExisting(dataProvider.orders.createOrderToPrCampaign(politician.gameId, politician.id, order))
        player.numberPrBlanks--
        dataProvider.playersState.updatePlayerState(politician.gameId, politician.id, player)

        return {
            status: ResponseStatus.OK
        }
    }

    return {
        status: ResponseStatus.NOT_ENOUGH_RESOURCES
    }
}
