import { sendForbidden, sendUnauthorized, verifyParameter } from "../../../../core/http/httputils";
import { empty } from "../../../../core/scheme/raw";
import { TeamId } from "../../../constants/Team";
import { DataProvider } from "../../../model/DataProvider";
import { Action } from "../../_common/Action";
import { ReserveTeam } from "../schemes";

const verifyUserAccess = <T>(player: null|T): T => {
    if (!player) {
        sendUnauthorized()
    }
    return player as T
}

const isTeamExist = async (dataProvider: DataProvider, gameUuid: string, teamId: number) => {
    const player = await dataProvider.player.getPlayerByGameUuidAndTeamId(gameUuid, teamId)

    return (player !== null) ? true : false
}

export const reserveTeam: Action<typeof ReserveTeam> = async ({dataProvider}, _, {playerToken, teamId}) => {
    const player = verifyUserAccess(await dataProvider.player.getPlayerByUuid(playerToken))
    verifyParameter(TeamId[teamId], 'If we are playing a sea battle, then you obviously did not get into the team')
    if (player.teamId) {
        sendForbidden('The user is already reserved for another team in the current game session')
    }
    if (await isTeamExist(dataProvider, player.gameUuid, teamId)) {
        sendForbidden('The current role in this game session is already reserved for another team')
    }
    await dataProvider.player.updateTeamIdByUuid(teamId, player.uuid)

    return empty
}
