import {object} from "../../../core/scheme/object";
import {guid, string} from "../../../core/scheme/string";
import {empty, optional, } from "../../../core/scheme/raw";
import { TeamId } from "../../constants/Team";

export namespace CreatePlayer {
    export const PathVariables = empty
    export const Request = () => object({
        name: string(),
        gameToken: guid()
    })
    export const Response = () => object({
        playerToken: guid(),
    })
}

export namespace GetTeamTokens {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid()
    })
    export const Response = () => object({
        [TeamId.SOUTH_EASTERN_RAILWAY]: optional(guid()),
        [TeamId.PACIFIC_RAILWAY]: optional(guid()),
        [TeamId.SOUTH_WESTERN_RAILWAY]: optional(guid()),
        [TeamId.NORTHERN_RAILWAY]: optional(guid()),
        [TeamId.NEW_YORK_RAILWAY]: optional(guid()),
        [TeamId.TEXAS_RAILWAY]: optional(guid()),
        [TeamId.FEDERATION]: optional(guid()),
        [TeamId.CONFEDERATION]: optional(guid()),
        [TeamId.REPUBLIC]: optional(guid()),
        [TeamId.PRESCOTT]: optional(guid()),
        [TeamId.WASHINGTON]: optional(guid()),
        [TeamId.BISMARCK]: optional(guid()),
        [TeamId.LITTLE_ROCK]: optional(guid())
    })
}
