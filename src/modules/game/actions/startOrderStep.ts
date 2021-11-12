import {sendForbidden} from "../../../../core/http/httputils"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyAuthorized, verifyTeam} from "../../_common/checks"
import {StartOrderStep} from "../schemes"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {Logger} from "../../../../core/Logger"
import {StepStatus} from "../../../model/Game"
import {empty} from "../../../../core/scheme/pseudo"

export const startOrderStep: Action<typeof StartOrderStep> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.getTeam(), [ Team.GAME_TECHNICIAN ])

    const game = await dataProvider.game.currentPhase(technician.getGameId())
    if (!game) {
        Logger.error("The game is missing from the game technician. Error in 'startOrderStep'")
        sendForbidden("Action is not available")
    }

    if (game.stateGame === GameStatus.PREPARATION) {
        sendForbidden("It is impossible to start the phase of orders, as the game is in a preparatory state")
    }

    if (game.stateGame === GameStatus.COMPLETED) {
        sendForbidden("It is not possible to start the orders phase since the game is over")
    }

    if (game.stateGame === GameStatus.ACTIVE && game.step === StepStatus.ORDERS) {
        sendForbidden("The step of orders is already in the active state")
    }

    dataProvider.game.startNextPhase(technician.getGameId())
        .then(value => {
            if (!value) {
                Logger.error("Failed to start the order submission phase. Error in 'startOrderStep'")
                sendForbidden("Action is not available")
            }
            dataProvider.game.finishPhase(technician.getGameId())
        })


    return empty

}
