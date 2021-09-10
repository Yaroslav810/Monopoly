import { verifyExisting } from "../../../../core/http/httputils";
import { Team } from "../../../constants/Team";
import { Action } from "../../_common/Action";
import { FreeTeams } from "../schemes";

export const getFreeTeams: Action<typeof FreeTeams> = async ({dataProvider}, _, {gameToken}) => {
    verifyExisting(await dataProvider.game.getGameById(gameToken))
    const players = await dataProvider.player.getPlayersByGameId(gameToken)

    const busyTeams: Array<number> = []
    players.forEach(player => {
        if (player.team || player.team === Team.GAME_TECHNICIAN) {
            busyTeams.push(player.team)
        }
    })

    return dataProvider.team.getTeamsList()
        .filter(team => !~busyTeams.indexOf(team))
}
