import {Action} from "../../_common/Action"
import {GameProgress} from "../schemes"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {verifyAuthorized} from "../../_common/checks"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {ErrorText} from "../../../constants/ErrorText"
import {Logger} from "../../../../core/Logger"

export const awaitingGameProgress: Action<typeof GameProgress> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    const game = verifyExisting(await dataProvider.game.getGameById(player.getGameId()))

    if (game.getState() !== GameStatus.ACTIVE) {
        sendForbidden(ErrorText.ERROR_AWAITING_GAME_PROGRESS)
    }

    let currentPlayer = await dataProvider.game.getCurrentPlayer(game.getId())
    if (!currentPlayer) {
        Logger.error("Ошибка получения currentPlayer в awaitingGameProgress")
        sendForbidden(ErrorText.ERROR_SERVER)
    }

    if (currentPlayer.getId() === playerToken) {
        sendForbidden(ErrorText.ERROR_ACTIVE_PLAYER_WAITING)
    }

    await dataProvider.game.gameProgressEvent()

    currentPlayer = await dataProvider.game.getCurrentPlayer(game.getId())
    if (!currentPlayer) {
        Logger.error("Ошибка получения currentPlayer в awaitingGameProgress")
        sendForbidden(ErrorText.ERROR_SERVER)
    }

    return {
        gameState: game.getState(),
        currentPlayer: currentPlayer.getName(),
        players: (await dataProvider.player.getPlayersStateByGameId(game.getId())),
        playersQueue: (await dataProvider.player.getPlayersQueueByGameId(game.getId())),
        property: []
    }
}
