import {Action} from "../../_common/Action"
import {GetGame} from "../schemes"
import {verifyAuthorized} from "../../_common/checks"

export const getGame: Action<typeof GetGame> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))

    return {
        gameToken: player.gameId
    }
}
