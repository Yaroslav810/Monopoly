import {Action} from "../../_common/Action"
import {GetStatus} from "../schemes"
import {verifyAuthorized} from "../../_common/checks"
import {
    GamePhaseResponseStatus,
    GameStateResponseStatus
} from "../../../constants/ResponseStatuses/GameStateResponseStatus"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {StepStatus} from "../../../model/Game"

export const getStatus: Action<typeof GetStatus> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))

    const game = await dataProvider.game.currentPhase(player.getGameId())
    if (!game || game.stateGame === GameStatus.COMPLETED) {
        return {
            status: GameStateResponseStatus.NO_GAME,
            turn: null,
            phase: null,
            remainingTimeInMs: null
        }
    }
    if (game.stateGame === GameStatus.PREPARATION) {
        return {
            status: GameStateResponseStatus.PREPARATION_PHASE,
            turn: null,
            phase: null,
            remainingTimeInMs: null
        }
    }

    if (game.stateGame === GameStatus.ACTIVE && game.step === StepStatus.ORDERS) {
        return {
            status: GameStateResponseStatus.ACTIVE_GAME,
            turn: game.currentMove,
            phase: GamePhaseResponseStatus.ORDER_PHASE,
            remainingTimeInMs: game.remainingTimeInMs
        }
    }

    return {
        status: GameStateResponseStatus.ACTIVE_GAME,
        turn: game.currentMove,
        phase: GamePhaseResponseStatus.EXECUTION_PHASE,
        remainingTimeInMs: null
    }
}
