import {Action} from "../../_common/Action"
import {MakeMove} from "../schemes"
import {verifyAuthorized} from "../../_common/checks"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {ErrorText} from "../../../constants/ErrorText"
import {Logger} from "../../../../core/Logger"

export const makeMove: Action<typeof MakeMove> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    const game = verifyExisting(await dataProvider.game.getGameById(player.getGameId()))
    if (game.getState() !== GameStatus.ACTIVE) {
        sendForbidden(ErrorText.ERROR_GAME_INACTIVE)
    }
    if (!await dataProvider.game.isMoveThisPlayer(player.getId())) {
        sendForbidden(ErrorText.ERROR_ANOTHER_PLAYER_MOVE)
    }

    const result = await dataProvider.game.makeMove(player.getId())
    if (!result) {
        Logger.error("Ошибка в MakeMove")
        sendForbidden(ErrorText.ERROR_MAKING_MOVE)
    }

    return result
}
