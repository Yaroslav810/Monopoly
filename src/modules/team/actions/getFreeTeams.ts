import { verifyExisting } from "../../../../core/http/httputils";
import { Team } from "../../../constants/Team";
import { Action } from "../../_common/Action";
import { verifyTeam } from "../../_common/checks";
import { FreeTeam } from "../schemes";

export const getFreeTeams: Action<typeof FreeTeam> = async ({dataProvider}, _, {gameToken}) => {
    verifyExisting(await dataProvider.game.getGameById(gameToken))
    const players = await dataProvider.player.getPlayersByGameId(gameToken)

    const busyTeams: Array<number> = []
    players.forEach(player => {
        if (player.teamId) {
            busyTeams.push(player.teamId)
        }
    })

    const result: Array<number> = []
    for (const item in Team) {
        if (verifyTeam(Number(item), [ Team.GAME_TECHNICIAN ])) {
            continue
        }
        if (!isNaN(Number(item)) && !~busyTeams.indexOf(Number(item))) {
            result.push(Number(item))
        }
    }

    return result
}
