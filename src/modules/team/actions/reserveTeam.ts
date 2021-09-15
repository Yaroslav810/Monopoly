import {sendForbidden} from "../../../../core/http/httputils"
import {empty} from "../../../../core/scheme/raw"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyUserAccess} from "../../_common/checks"
import {ReserveTeam} from "../schemes"

export const reserveTeam: Action<typeof ReserveTeam> = async ({dataProvider}, _, {playerToken, team}) => {
    const player = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    if (player.team || player.team === Team.GAME_TECHNICIAN) {
        sendForbidden("The user is already reserved for another team in the current game session")
    }
    if (await dataProvider.team.isTeamReserved(player.gameId, team)) {
        sendForbidden("The current role in this game session is already reserved for another team")
    }
    await dataProvider.player.updateTeamById(team, player.id)

    return empty
}
