import {verifyExisting} from "../../../../core/http/httputils"
import {Action} from "../../_common/Action"
import {GetOccupiedTeams} from "../schemes"

export const getOccupiedTeams: Action<typeof GetOccupiedTeams> = async ({dataProvider}, {gameToken}) => {
    verifyExisting(await dataProvider.game.getGameById(gameToken))

    return dataProvider.player.getBusyTeams(gameToken)
}
