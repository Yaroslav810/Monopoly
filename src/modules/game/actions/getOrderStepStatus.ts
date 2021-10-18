import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyAuthorized} from "../../_common/checks"
import {GetStatusOrderStep} from "../schemes"
import {Logger} from "../../../../core/Logger"
import {verifyExisting} from "../../../../core/http/httputils"

export const getStatusOrderStep: Action<typeof GetStatusOrderStep> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.team, [ Team.GAME_TECHNICIAN ])

    const players = verifyExisting(dataProvider.playersState.getStateByGameId(technician.gameId))
    players.forEach(player => {
        Logger.log(player.getId())
        Logger.log(String(player.getBudgetUnits()))
        Logger.log(String(player.getNumberMovementArmyBlanks()))
        Logger.log(String(player.getNumberPrBlanks()))
        Logger.log(String(player.getNumberRailwayConstructionBlanks()))
        Logger.log(String(player.getNumberWarehouseConstructionBlanks()))
        Logger.log(String(player.getNumberNegotiationsWithIndiansBlanks()))
        Logger.log(String(player.getNumberNewBlanks()))
    })

    return {
        remainingTimeInMs: dataProvider.timer.getRemainingTimeInMs(technician.gameId)
    }
}
