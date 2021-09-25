import {Team} from "../../../constants/Team"
import {Action} from "../../_common/Action"
import {verifyTeam, verifyUserAccess} from "../../_common/checks"
import {GetStatusOrderStep} from "../schemes"

export const getStatusOrderStep: Action<typeof GetStatusOrderStep> = async ({dataProvider}, _, {playerToken}) => {
    const technician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(technician.team, [ Team.GAME_TECHNICIAN ])

    return {
        remainingTimeInMs: dataProvider.timer.getRemainingTimeInMs(technician.gameId)
    }
}
