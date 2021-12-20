import {Action} from "../../_common/Action"
import {StartGame} from "../schemes"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {empty} from "../../../../core/scheme/pseudo"
import {verifyAuthorized} from "../../_common/checks"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {ErrorText} from "../../../constants/ErrorText"

export const awaitingStartGame: Action<typeof StartGame> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    const game = verifyExisting(await dataProvider.game.getGameById(player.getGameId()))

    if (game.getState() !== GameStatus.RECRUITMENT_OF_PLAYERS && game.getState() !== GameStatus.PREPARATION) {
        sendForbidden(ErrorText.ERROR_AWAITING_GAME_START)
    }

    await dataProvider.game.startGameEvent(game.getId(), player.getId())
    dataProvider.game.startGame(game.getId()).then()

    return empty
}
