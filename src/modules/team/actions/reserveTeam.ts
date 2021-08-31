import { sendForbidden, verifyExisting, verifyParameter, verifyUserAccess } from "../../../../core/http/httputils";
import { TeamId } from "../../../constants/Team";
import { Action } from "../../_common/Action";
import { ReserveTeam } from "../schemes";

export const reserveTeam: Action<typeof ReserveTeam> = async ({dataProvider}, _, {sessionGame, userToken, teamId}) => {
    const game = verifyExisting(await dataProvider.game.getGameByUuid(sessionGame))
    const user = verifyUserAccess(await dataProvider.user.getUserByUuid(userToken))
    verifyParameter(TeamId[teamId], 'If we are playing a sea battle, then you obviously did not get into the team')
    if (await dataProvider.gamer.getGamerFromGameIdAndUserId(game.id, user.id)) {
        sendForbidden('The user is already reserved for another team in the current game session')
    }
    if (await dataProvider.gamer.getGamerFromGameIdAndTeamId(game.id, teamId)) {
        sendForbidden('The current role in this game session is already reserved for another team')
    }
    let team = await dataProvider.team.getTeamByCode(teamId)
    if (!team) {
        team = await dataProvider.team.create(teamId)
    }
    await dataProvider.gamer.create(game.id, user.id, team.id)

    return {
        teamToken: team.uuid
    }
}
