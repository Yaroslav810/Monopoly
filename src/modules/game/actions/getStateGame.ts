import {Action} from "../../_common/Action"
import {GetStateGame} from "../schemes"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {Logger} from "../../../../core/Logger"
import {GameStatus} from "../../../infrastructure/configurations/Game"

export const getStateGame: Action<typeof GetStateGame> = async ({dataProvider}, {gameToken}) => {
    const game = verifyExisting(await dataProvider.game.getGameById(gameToken))

    if (game.getState() === GameStatus.RECRUITMENT_OF_PLAYERS || game.getState() === GameStatus.GAME_OVER) {
        return {
            gameState: game.getState(),
            currentPlayer: null,
            players: null,
            playersQueue: null,
            property: null
        }
    }

    const currentPlayer = await dataProvider.game.getCurrentPlayer(game.getId())
    if (!currentPlayer) {
        Logger.error("Ошибка получения currentPlayer")
        sendForbidden("Внутренняя ошибка сервера")
    }

    return {
        gameState: game.getState(),
        currentPlayer: currentPlayer.getName(),
        players: (await dataProvider.player.getPlayersStateByGameId(game.getId())),
        playersQueue: (await dataProvider.player.getPlayersQueueByGameId(game.getId())),
        property: []
    }
}
