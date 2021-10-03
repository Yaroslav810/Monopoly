import {array} from "../../../core/scheme/array"
import {number} from "../../../core/scheme/number"
import {object} from "../../../core/scheme/object"
import {empty} from "../../../core/scheme/pseudo"
import {guid} from "../../../core/scheme/string"
import {Role} from "../../constants/Role"

export namespace CreateGame {
    export const PathVariables = empty
    export const Request = empty
    export const Response = () => object({
        gameToken: guid(),
        gameTechnician: guid()
    })
}

export namespace GetRating {
    const RatingItem = () => object({
        team_id: number(),
        ratingChange1: number(),
        ratingChange2: number(),
        ratingChange3: number(),
        rating: number()
    })

    export const PathVariables = () => object({
        gameId: guid()
    })
    export const Request = empty
    export const Response = () => object({
        [Role.RAILWAYS]: array(RatingItem()),
        [Role.POLICIES]: array(RatingItem()),
        [Role.TRADING_COMPANIES]: array(RatingItem())
    })
}

export namespace StartOrderStep {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid()
    })
    export const Response = () => object({
        remainingTimeInMs: number()
    })
}

export namespace GetStatusOrderStep {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid()
    })
    export const Response = () => object({
        remainingTimeInMs: number()
    })
}
