import {Action} from "../../_common/Action"
import {MakeDecision} from "../schemes"
import {empty} from "../../../../core/scheme/pseudo"
import {verifyAuthorized} from "../../_common/checks"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {GameStatus} from "../../../infrastructure/configurations/Game"
import {ErrorText} from "../../../constants/ErrorText"

export const makeDecision: Action<typeof MakeDecision> = async ({dataProvider}, _, {playerToken, decision}) => {
    // noinspection DuplicatedCode
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    const game = verifyExisting(await dataProvider.game.getGameById(player.getGameId()))
    if (game.getState() !== GameStatus.ACTIVE) {
        sendForbidden(ErrorText.ERROR_GAME_INACTIVE)
    }
    if (!await dataProvider.game.isMoveThisPlayer(player.getId())) {
        sendForbidden(ErrorText.ERROR_ANOTHER_PLAYER_MOVE)
    }

    if (!await dataProvider.game.didPlayerRollDice(player.getId())) {
        sendForbidden(ErrorText.ERROR_DICE_NOT_THROWN)
    }

    if (!await dataProvider.game.canPlayerPerformAction(player.getId(), decision)) {
        sendForbidden(ErrorText.ERROR_ACTION_DENIED)
    }

    await dataProvider.game.makeDecision(player.getId(), decision)

    return empty
}
