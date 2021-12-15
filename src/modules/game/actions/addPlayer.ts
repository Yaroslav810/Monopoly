import {Action} from "../../_common/Action"
import {AddPlayer} from "../schemes"
import {ErrorText} from "../../../constants/ErrorText"
import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"

export const addPlayer: Action<typeof AddPlayer> = async ({dataProvider}, _, {gameToken, name}) => {
    const game = verifyExisting(await dataProvider.game.getGameById(gameToken))
    // Todo: Проверка количества присоединённых игроков в checks.ts

    const player = await dataProvider.player.createPlayer(game.getId(), name)
    if (!player) {
        sendForbidden(ErrorText.ERROR_ADD_PLAYER)
    }

    return {
        playerToken: player.getId()
    }
}
