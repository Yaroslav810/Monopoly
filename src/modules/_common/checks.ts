import {sendForbidden, sendUnauthorized} from "../../../core/http/httputils"
import {Team} from "../../constants/Team"

export const verifyUserAccess = <T>(player: null|T): T => {
    if (!player) {
        sendUnauthorized()
    }
    return player as T
}

export const verifyTeam = (checkingTeam: number, availableTeamsList: Array<number>) => {
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

export const isPolitician = (team: number) => {
    return ~[Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC].indexOf(team)
}
