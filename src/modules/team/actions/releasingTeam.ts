import {sendForbidden} from "../../../../core/http/httputils"
import {empty} from "../../../../core/scheme/raw"
import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {isPolitician, verifyUserAccess} from "../../_common/checks"
import {ReleasingTeam} from "../schemes"

export const releasingTeam: Action<typeof ReleasingTeam> = async ({dataProvider}, _, {playerToken}) => {
    const player = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    if (player.team === Team.GAME_TECHNICIAN) {
        sendForbidden("The role of the game technician cannot be changed")
    }
    await dataProvider.player.updateTeamById(null, player.id)

    if (isPolitician(player.team)) {
        await dataProvider.politician.delete(player.id)
    }

    return empty
}
