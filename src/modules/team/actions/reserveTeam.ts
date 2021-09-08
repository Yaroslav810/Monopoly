import { sendForbidden, sendUnauthorized } from "../../../../core/http/httputils";
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

const isTeamExist = async (dataProvider: DataProvider, gameId: string, teamId: number) => {
    const player = await dataProvider.player.getPlayerByGameIdAndTeamId(gameId, teamId)

    return (player !== null) ? true : false
}

export const reserveTeam: Action<typeof ReserveTeam> = async ({dataProvider}, _, {playerToken, teamId}) => {
    const player = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    if (player.teamId === TeamId.GAME_TECHNICIAN) {
        sendForbidden('A game technician cannot change the team')
    }
    if (player.teamId) {
        sendForbidden('The user is already reserved for another team in the current game session')
    }
    if (await isTeamExist(dataProvider, player.gameId, teamId)) {
        sendForbidden('The current role in this game session is already reserved for another team')
    }
    await dataProvider.player.updateTeamIdById(teamId, player.id)

    return empty
}
