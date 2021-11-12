import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyAuthorized, verifyTeam} from "../../_common/checks"
import {GetStatusOrderStep} from "../schemes"
import {Logger} from "../../../../core/Logger"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {StepStatus} from "../../../model/Game"

export const getStatusOrderStep: Action<typeof GetStatusOrderStep> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.getTeam(), [ Team.GAME_TECHNICIAN ])

    const game = await dataProvider.game.currentPhase(technician.getGameId())
    if (!game || game.stateGame !== GameStatus.ACTIVE || game.step !== StepStatus.ORDERS) {
        sendForbidden("The action can only be performed during the order submission phase")
    }

    const players = verifyExisting(await dataProvider.player.getPlayersTeamByGameId(technician.getGameId()))
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
        remainingTimeInMs: game.remainingTimeInMs
    }
}
