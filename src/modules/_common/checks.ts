import {sendForbidden, sendUnauthorized} from "../../../core/http/httputils"
import {GameData} from "../../constants/GameData"
import {ErrorText} from "../../constants/ErrorText"

export const verifyAuthorized = <T>(player: null | T): T => {
    if (!player) {
        sendUnauthorized()
    }
    return player as T
}

export const verifyNumberPlayers = (numberPlayers: number) => {
    if (numberPlayers > GameData.MAX_NUMBER_PLAYER || numberPlayers < GameData.MIN_NUMBER_PLAYER) {
        sendForbidden(ErrorText.ERROR_NUMBER_PLAYERS)
    }
}

export const verifyTimer = (time: number) => {
    if (!time) {
        sendForbidden(ErrorText.ERROR_TIME)
    }
}
