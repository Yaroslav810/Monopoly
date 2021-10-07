import {sendForbidden} from "../../../../core/http/httputils"
import {empty} from "../../../../core/scheme/pseudo"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyAuthorized} from "../../_common/checks"
import {ReleasingTeam} from "../schemes"

export const releasingTeam: Action<typeof ReleasingTeam> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyAuthorized(await dataProvider.player.getPlayerById(playerToken))
    if (player.team === Team.GAME_TECHNICIAN) {
        sendForbidden("The role of the game technician cannot be changed")
    }

    await dataProvider.player.deleteTeam(player.id)

    return empty
}
