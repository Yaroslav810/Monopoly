import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyAuthorized} from "../../_common/checks"
import {GetTeamTokens} from "../schemes"

export const getTeamTokens: Action<typeof GetTeamTokens> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.getTeam(), [ Team.GAME_TECHNICIAN ])

    const teamsToken = await dataProvider.player.getPlayersTeamTokens(technician.getGameId())

    return {
        [Team.SOUTH_EASTERN_RAILWAY]: teamsToken.get(Team.SOUTH_EASTERN_RAILWAY) ?? null,
        [Team.PACIFIC_RAILWAY]: teamsToken.get(Team.PACIFIC_RAILWAY) ?? null,
        [Team.SOUTH_WESTERN_RAILWAY]: teamsToken.get(Team.SOUTH_WESTERN_RAILWAY) ?? null,
        [Team.NORTHERN_RAILWAY]: teamsToken.get(Team.NORTHERN_RAILWAY) ?? null,
        [Team.NEW_YORK_RAILWAY]: teamsToken.get(Team.NEW_YORK_RAILWAY) ?? null,
        [Team.TEXAS_RAILWAY]: teamsToken.get(Team.TEXAS_RAILWAY) ?? null,
        [Team.FEDERATION]: teamsToken.get(Team.FEDERATION) ?? null,
        [Team.CONFEDERATION]: teamsToken.get(Team.CONFEDERATION) ?? null,
        [Team.REPUBLIC]: teamsToken.get(Team.REPUBLIC) ?? null,
        [Team.PRESCOTT]: teamsToken.get(Team.PRESCOTT) ?? null,
        [Team.WASHINGTON]: teamsToken.get(Team.WASHINGTON) ?? null,
        [Team.BISMARCK]: teamsToken.get(Team.BISMARCK) ?? null,
        [Team.LITTLE_ROCK]: teamsToken.get(Team.LITTLE_ROCK) ?? null
    }
}
