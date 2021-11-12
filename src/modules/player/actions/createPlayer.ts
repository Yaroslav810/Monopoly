import {sendForbidden, verifyExisting} from "../../../../core/http/httputils"
import {Action} from "../../_common/Action"
import {CreatePlayer} from "../schemes"

export const createPlayer: Action<typeof CreatePlayer> = async ({dataProvider}, _, {name, gameToken}) => {
    const game = verifyExisting(await dataProvider.game.getGameById(gameToken))

    const player = await dataProvider.player.createPlayer(game.getId(), name)
    if (!player) {
        return sendForbidden("It is impossible to create a player. The game may already be active or completed")
    }

    return {
        playerToken: player.getId()
    }
}
