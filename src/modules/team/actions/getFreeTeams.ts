import {verifyExisting} from "../../../../core/http/httputils"
import {Action} from "../../_common/Action"
import {GetFreeTeams} from "../schemes"

export const getFreeTeams: Action<typeof GetFreeTeams> = async ({dataProvider}, _, {gameToken}) => {
    verifyExisting(await dataProvider.game.getGameById(gameToken))

    return dataProvider.player.getFreeTeams(gameToken)
}
