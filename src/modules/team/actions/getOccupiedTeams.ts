import {verifyExisting} from "../../../../core/http/httputils"
import {Action} from "../../_common/Action"
import {GetOccupiedTeams} from "../schemes"

export const getOccupiedTeams: Action<typeof GetOccupiedTeams> = async ({dataProvider}, {gameId}) => {
    verifyExisting(await dataProvider.game.getGameById(gameId))

    const players = await dataProvider.player.getPlayersByGameId(gameId)
    const occupiedTeams: Array<{team: number, name: string}> = []
    players.filter(player => player.team).forEach(player => {
        occupiedTeams.push({
            team: player.team,
            name: player.name
        })
    })
    
    return occupiedTeams
}
