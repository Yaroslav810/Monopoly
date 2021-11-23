import {sendForbidden, sendUnauthorized} from "../../../core/http/httputils"

export const verifyAuthorized = <T>(player: null | T): T => {
    if (!player) {
        sendUnauthorized()
    }
    return player as T
}

export const verifyTeam = (checkingTeam: number | null, availableTeamsList: Array<number>) => {
    const isTeamPresent = availableTeamsList.some(availableTeam => availableTeam === checkingTeam)
    
    if (!isTeamPresent) {
        sendForbidden("The team does not have access to perform operations")
    }
}

export const verifyTimer = (time: number) => {
    if (!time) {
        sendForbidden("The orders step is not active")
    }
}
