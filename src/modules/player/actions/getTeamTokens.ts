import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyUserAccess} from "../../_common/checks"
import {GetTeamTokens} from "../schemes"

export const getTeamTokens: Action<typeof GetTeamTokens> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.team, [ Team.GAME_TECHNICIAN ])

    const players = await dataProvider.player.getPlayersByGameId(technician.gameId)

    const playersMap = new Map<number, string>()
    players.forEach(player => {
        playersMap.set(player.team, player.id)
    })

    return {
        [Team.SOUTH_EASTERN_RAILWAY]: playersMap.get(Team.SOUTH_EASTERN_RAILWAY) ?? null,
        [Team.PACIFIC_RAILWAY]: playersMap.get(Team.PACIFIC_RAILWAY) ?? null,
        [Team.SOUTH_WESTERN_RAILWAY]: playersMap.get(Team.SOUTH_WESTERN_RAILWAY) ?? null,
        [Team.NORTHERN_RAILWAY]: playersMap.get(Team.NORTHERN_RAILWAY) ?? null,
        [Team.NEW_YORK_RAILWAY]: playersMap.get(Team.NEW_YORK_RAILWAY) ?? null,
        [Team.TEXAS_RAILWAY]: playersMap.get(Team.TEXAS_RAILWAY) ?? null,
        [Team.FEDERATION]: playersMap.get(Team.FEDERATION) ?? null,
        [Team.CONFEDERATION]: playersMap.get(Team.CONFEDERATION) ?? null,
        [Team.REPUBLIC]: playersMap.get(Team.REPUBLIC) ?? null,
        [Team.PRESCOTT]: playersMap.get(Team.PRESCOTT) ?? null,
        [Team.WASHINGTON]: playersMap.get(Team.WASHINGTON) ?? null,
        [Team.BISMARCK]: playersMap.get(Team.BISMARCK) ?? null,
        [Team.LITTLE_ROCK]: playersMap.get(Team.LITTLE_ROCK) ?? null
    }
}
