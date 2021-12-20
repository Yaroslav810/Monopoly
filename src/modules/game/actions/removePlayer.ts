import {Action} from "../../_common/Action"
import {RemovePlayer} from "../schemes"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {ErrorText} from "../../../constants/ErrorText"
import {verifyAuthorized} from "../../_common/checks"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {empty} from "../../../../core/scheme/pseudo"

export const removePlayer: Action<typeof RemovePlayer> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    const game = verifyExisting(await dataProvider.game.getGameById(player.getGameId()))

    if (game.getState() !== GameStatus.RECRUITMENT_OF_PLAYERS) {
        sendForbidden(ErrorText.ERROR_REMOVE_PLAYER)
    }

    dataProvider.player.removePlayer(player.getId()).then()
    dataProvider.game.removePlayer(game.getId(), player.getId())

    return empty
}
