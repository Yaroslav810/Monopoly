import { sendUnauthorized } from "../../../../core/http/httputils";
import { TeamId } from "../../../constants/Team";
import { Action } from "../../_common/Action";
import { GetTeamTokens } from "../schemes";

const verifyUserAccess = <T>(technician: null|T): T => {
    if (!technician) {
        sendUnauthorized()
    }
    return technician as T
}

export const getTeamTokens: Action<typeof GetTeamTokens> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyUserAccess(await dataProvider.player.getGameTechnicianById(playerToken))
    const players = await dataProvider.player.getPlayersByGameId(technician.gameId)

    const playersMap = new Map<number, string>()
    players.forEach(player => {
        playersMap.set(player.teamId, player.id)
    })

    return {
        [TeamId.SOUTH_EASTERN_RAILWAY]: playersMap.get(TeamId.SOUTH_EASTERN_RAILWAY),
        [TeamId.PACIFIC_RAILWAY]: playersMap.get(TeamId.PACIFIC_RAILWAY),
        [TeamId.SOUTH_WESTERN_RAILWAY]: playersMap.get(TeamId.SOUTH_WESTERN_RAILWAY),
        [TeamId.NORTHERN_RAILWAY]: playersMap.get(TeamId.NORTHERN_RAILWAY),
        [TeamId.NEW_YORK_RAILWAY]: playersMap.get(TeamId.NEW_YORK_RAILWAY),
        [TeamId.TEXAS_RAILWAY]: playersMap.get(TeamId.TEXAS_RAILWAY),
        [TeamId.FEDERATION]: playersMap.get(TeamId.FEDERATION),
        [TeamId.CONFEDERATION]: playersMap.get(TeamId.CONFEDERATION),
        [TeamId.REPUBLIC]: playersMap.get(TeamId.REPUBLIC),
        [TeamId.PRESCOTT]: playersMap.get(TeamId.PRESCOTT),
        [TeamId.WASHINGTON]: playersMap.get(TeamId.WASHINGTON),
        [TeamId.BISMARCK]: playersMap.get(TeamId.BISMARCK),
        [TeamId.LITTLE_ROCK]: playersMap.get(TeamId.LITTLE_ROCK)
    }
}
