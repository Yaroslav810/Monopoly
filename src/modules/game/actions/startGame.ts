import {sendForbidden} from "../../../../core/http/httputils"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyAuthorized, verifyTeam} from "../../_common/checks"
import {StartGame} from "../schemes"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {Logger} from "../../../../core/Logger"
import {empty} from "../../../../core/scheme/pseudo"

export const startGame: Action<typeof StartGame> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.getTeam(), [ Team.GAME_TECHNICIAN ])

    const game = await dataProvider.game.currentPhase(technician.getGameId())
    if (!game) {
        Logger.error("The game is missing from the game technician. Error in 'startGame'")
        sendForbidden("Action is not available")
    }

    if (game.stateGame !== GameStatus.PREPARATION) {
        sendForbidden("Unable to start the current game")
    }

    await dataProvider.game.startGame(technician.getGameId())

    return empty
}
