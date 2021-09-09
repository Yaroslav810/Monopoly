import { sendUnauthorized } from "../../../core/http/httputils"

export const verifyUserAccess = <T>(player: null|T): T => {
    if (!player) {
        sendUnauthorized()
    }
    return player as T
}

export const verifyTeam = (checkingTeam: number, availableTeamsList: Array<number>): boolean => {
    return availableTeamsList.some(availableTeam => availableTeam === checkingTeam)
}
