import {object} from "../../../core/scheme/object"
import {empty} from "../../../core/scheme/pseudo"
import {guid, string} from "../../../core/scheme/string"
import {number} from "../../../core/scheme/number"
import {array} from "../../../core/scheme/array"

export namespace CreateGame {
    export const PathVariables = empty
    export const Request = () => object({
        name: string(),
        numberOfPlayers: number()
    })
    export const Response = () => object({
        gameToken: guid(),
        playerToken: guid()
    })
}

export namespace AddPlayer {
    export const PathVariables = empty
    export const Request = () => object({
        gameToken: guid(),
        name: string()
    })
    export const Response = () => object({
        playerToken: guid()
    })
}

export namespace RemovePlayer {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid()
    })
    export const Response = empty
}

export namespace GetAvailable {
    const Player = () => object({
        name: string(),
        playerToken: guid()
    })

    export const PathVariables = empty
    export const Request = empty
    export const Response = () => object({
        games: array(object({
            gameToken: guid(),
            numberPlayers: number(),
            players: array(Player())
        }))
    })
}
