import {object} from "../../../core/scheme/object"
import {guid, string} from "../../../core/scheme/string"
import {empty, optional} from "../../../core/scheme/raw"
import {Team} from "../../constants/Team"

export namespace CreatePlayer {
    export const PathVariables = empty
    export const Request = () => object({
        name: string(),
        gameToken: guid()
    })
    export const Response = () => object({
        playerToken: guid()
    })
}

export namespace GetTeamTokens {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid()
    })
    export const Response = () => object({
        [Team.SOUTH_EASTERN_RAILWAY]: optional(guid()),
        [Team.PACIFIC_RAILWAY]: optional(guid()),
        [Team.SOUTH_WESTERN_RAILWAY]: optional(guid()),
        [Team.NORTHERN_RAILWAY]: optional(guid()),
        [Team.NEW_YORK_RAILWAY]: optional(guid()),
        [Team.TEXAS_RAILWAY]: optional(guid()),
        [Team.FEDERATION]: optional(guid()),
        [Team.CONFEDERATION]: optional(guid()),
        [Team.REPUBLIC]: optional(guid()),
        [Team.PRESCOTT]: optional(guid()),
        [Team.WASHINGTON]: optional(guid()),
        [Team.BISMARCK]: optional(guid()),
        [Team.LITTLE_ROCK]: optional(guid())
    })
}
