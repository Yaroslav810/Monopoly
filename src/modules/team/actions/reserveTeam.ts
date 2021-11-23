import {sendForbidden} from "../../../../core/http/httputils"
import {empty} from "../../../../core/scheme/pseudo"
import {Action} from "../../_common/Action"
import {verifyAuthorized} from "../../_common/checks"
import {ReserveTeam} from "../schemes"

export const reserveTeam: Action<typeof ReserveTeam> = async ({dataProvider}, _, {playerToken, team}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))

    if (player.getTeam() !== null) {
        sendForbidden("The user is already reserved for another team in the current game session")
    }

    if (await dataProvider.player.isTeamReserved(player.getGameId(), team)) {
        sendForbidden("The current role in this game session is already reserved for another team")
    }

    await dataProvider.player.reserveTeam(player.getId(), team)
    return empty
}
