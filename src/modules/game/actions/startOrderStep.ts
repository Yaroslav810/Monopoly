import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyUserAccess} from "../../_common/checks"
import {StartOrderStep} from "../schemes"
import {PlayerType} from "../../../model/Player"
import {DataProvider} from "../../../model/DataProvider"

const getDetailsAllPlayers = async (dataProvider: DataProvider, gameId: string): Promise<Array<PlayerType>> => {
    const players = await dataProvider.player.getPlayersByGameId(gameId)

    const detailInfoPlayers: Array<PlayerType> = []
    for (const player of players) {
        switch (player.team) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                const politician = verifyUserAccess(await dataProvider.politician.getByPlayerId(player.id))
                politician.prepareToOrdersStep()
                detailInfoPlayers.push(politician)
                break
            }
        }
    }

    return detailInfoPlayers
}

export const startOrderStep: Action<typeof StartOrderStep> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.team, [ Team.GAME_TECHNICIAN ])
    if (dataProvider.timer.getRemainingTimeInMs(technician.gameId)) {
        sendForbidden("The step of orders is already in the active state")
    }

    const detailInfoPlayers = await getDetailsAllPlayers(dataProvider, technician.gameId)

    dataProvider.playersState.initPlayersStateStorage(technician.gameId, detailInfoPlayers)
    dataProvider.orders.initOrdersStorage(technician.gameId)
    dataProvider.timer.start(technician.gameId)
        .then(() => {
            dataProvider.orders.executeOrders(technician.gameId)

            const players = verifyExisting(dataProvider.playersState.getStateByGameId(technician.gameId))
            players.forEach(async player => {
                if (dataProvider.politician.isPolitician(player)) {
                    await dataProvider.politician.finishToOrderStep(player.getId())
                }
            })
        })


    return {
        remainingTimeInMs: dataProvider.timer.getRemainingTimeInMs(technician.gameId)
    }
}
