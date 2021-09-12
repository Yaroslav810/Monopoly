import {verifyExisting} from "../../../../core/http/httputils"
import {Action} from "../../_common/Action"
import {OccupiedTeams} from "../schemes"

export const getOccupiedTeams: Action<typeof OccupiedTeams> = async ({dataProvider}, {gameId}) => {
    verifyExisting(await dataProvider.game.getGameById(gameId))

    const players = await dataProvider.player.getPlayersByGameId(gameId)
    const occupiedTeams: Array<{teamId: number, name: string}> = []
    players.filter(player => player.teamId).forEach(player => {
        occupiedTeams.push({
            teamId: player.teamId,
            name: player.name
        })
    })
    
    return occupiedTeams
}
