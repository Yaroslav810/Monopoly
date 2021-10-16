import {Action} from "../../_common/Action"
import {GetStatus} from "../schemes"
import {verifyAuthorized} from "../../_common/checks"
import {
    GamePhaseResponseStatus,
    GameStateResponseStatus
} from "../../../constants/ResponseStatuses/GameStateResponseStatus"
import {GameStatus} from "../../../model/Game"

export const getStatus: Action<typeof GetStatus> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))

    const game = await dataProvider.game.getGameById(player.gameId)
    if (!game || game.state === GameStatus.COMPLETED) {
        return {
            status: GameStateResponseStatus.NO_GAME,
            turn: null,
            phase: null,
            remainingTimeInMs: null
        }
    }
    if (game.state === GameStatus.PREPARATION) {
        return {
            status: GameStateResponseStatus.PREPARATION_PHASE,
            turn: null,
            phase: null,
            remainingTimeInMs: null
        }
    }

    const timer = dataProvider.timer.getRemainingTimeInMs(game.id)

    return {
        status: GameStateResponseStatus.ACTIVE_GAME,
        turn: game.currentMove,
        phase: timer !== 0
            ? GamePhaseResponseStatus.ORDER_PHASE
            : GamePhaseResponseStatus.EXECUTION_PHASE,
        remainingTimeInMs: timer !== 0 ? timer : null
    }
}
