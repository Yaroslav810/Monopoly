import {verifyExisting} from "../../../../core/http/httputils"
import {Action} from "../../_common/Action"
import {CreatePlayer} from "../schemes"

export const createPlayer: Action<typeof CreatePlayer> = async ({dataProvider}, _, {name, gameToken}) => {
    const game = verifyExisting(await dataProvider.game.getGameById(gameToken))
    const player = await dataProvider.player.create({
        name: name,
        gameId: game.id,
        team: null
    })

    return {
        playerToken: player.id
    }
}
