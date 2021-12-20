import {Action} from "../../_common/Action"
import {AddPlayer} from "../schemes"
import {ErrorText} from "../../../constants/ErrorText"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"

export const addPlayer: Action<typeof AddPlayer> = async ({dataProvider}, _, {gameToken, name}) => {
    const game = verifyExisting(await dataProvider.game.getGameById(gameToken))

    const players = await dataProvider.player.getPlayersByGameId(game.getId())
    if (players.length >= game.getNumberPlayers()) {
        sendForbidden(ErrorText.ERROR_ADD_PLAYER)
    }

    const player = await dataProvider.player.createPlayer(game.getId(), name)
    if (!player) {
        sendForbidden(ErrorText.ERROR_ADD_PLAYER)
    }
    dataProvider.game.addPlayer(game.getId(), player.getId())

    if (game.getNumberPlayers() == players.length + 1) {
        dataProvider.game.onPrepareGame(game.getId()).then()
    }

    return {
        playerToken: player.getId()
    }
}
