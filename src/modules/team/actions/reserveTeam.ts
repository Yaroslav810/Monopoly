import {sendForbidden} from "../../../../core/http/httputils"
import {empty} from "../../../../core/scheme/pseudo"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyAuthorized} from "../../_common/checks"
import {ReserveTeam} from "../schemes"

export const reserveTeam: Action<typeof ReserveTeam> = async ({dataProvider}, _, {playerToken, team}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))

    if (player.team || player.team === Team.GAME_TECHNICIAN) {
        sendForbidden("The user is already reserved for another team in the current game session")
    }

    if (await dataProvider.team.isTeamReserved(player.gameId, team)) {
        sendForbidden("The current role in this game session is already reserved for another team")
    }

    await dataProvider.player.setTeam(team, player)
    return empty
}
