import { verifyExisting } from "../../../../core/http/httputils";
import {Action} from "../../_common/Action";
import {CreatePlayer} from "../schemes";

export const createPlayer: Action<typeof CreatePlayer> = async ({dataProvider}, _, {name, gameToken}) => {
    const game = verifyExisting(await dataProvider.game.getGameByUuid(gameToken))
    const player = await dataProvider.player.create({
        name: name,
        gameUuid: game.uuid,
        teamId: null
    })
    
    return {
        playerToken: player.uuid
    }
}
