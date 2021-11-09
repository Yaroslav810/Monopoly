import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyAuthorized, verifyTeam} from "../../_common/checks"
import {StartOrderStep} from "../schemes"
import {GameStatus} from "../../../model/Game"

export const startOrderStep: Action<typeof StartOrderStep> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.team, [ Team.GAME_TECHNICIAN ])
    if (dataProvider.timer.getRemainingTimeInMs(technician.gameId)) {
        sendForbidden("The step of orders is already in the active state")
    }

    const detailInfoPlayers = await dataProvider.player.getInfoAboutTeams(technician.gameId)
    if (detailInfoPlayers.length === 0) {
        sendForbidden("A game without players is not interesting, probably")
    }
    dataProvider.player.prepareData(detailInfoPlayers)
    dataProvider.game.changeState(technician.gameId, GameStatus.ACTIVE)

    dataProvider.playersState.initPlayersStateStorage(technician.gameId, detailInfoPlayers)
    dataProvider.orders.initOrdersStorage(technician.gameId)
    dataProvider.timer.start(technician.gameId)
        .then(async () => {
            dataProvider.orders.executeOrders(technician.gameId)

            const players = verifyExisting(dataProvider.playersState.getStateByGameId(technician.gameId))
            await dataProvider.player.commitState(players)
            await Promise.all([
                dataProvider.player.addRevenueToPlayers(technician.gameId),
                dataProvider.game.incrementMove(technician.gameId)
            ])
        })

    return {
        remainingTimeInMs: dataProvider.timer.getRemainingTimeInMs(technician.gameId)
    }
}
