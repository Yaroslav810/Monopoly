import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyUserAccess} from "../../_common/checks"
import {StartOrderStep} from "../schemes"
import {PlayerType} from "../../../model/Player"
import {Politician} from "../../../model/Politician"
import {DataProvider} from "../../../model/DataProvider"

const preparePoliticianToOrdersStep = (politician: Politician) => {
    politician.numberMovementArmyBlanks = 1
    politician.numberNewBlanks = 1
}

const getDetailsAllPlayers = async (dataProvider: DataProvider, gameId: string): Promise<Array<PlayerType>> => {
    const players = await dataProvider.player.getPlayersByGameId(gameId)

    const detailInfoPlayers: Array<PlayerType> = []
    for (const player of players) {
        switch (player.team) {
        case Team.FEDERATION:
        case Team.CONFEDERATION:
        case Team.REPUBLIC: {
            const politician = verifyUserAccess(await dataProvider.politician.getByPlayerId(player.id))
            preparePoliticianToOrdersStep(politician)
            detailInfoPlayers.push(politician)
            break
        }
        }
    }

    return detailInfoPlayers
}

const isPolitician = (player: PlayerType): player is Politician => {
    return player && player.budgetUnits !== undefined
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
            players.forEach(player => {
                if (isPolitician(player)) {
                    player.budgetUnits += 15
                    dataProvider.playersState.updatePlayerState(technician.gameId, player.playerId, player)
                }
            })
        })


    return {
        remainingTimeInMs: dataProvider.timer.getRemainingTimeInMs(technician.gameId)
    }
}
