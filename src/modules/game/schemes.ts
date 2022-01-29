import {object} from "../../../core/scheme/object"
import {empty, enumerate, optional} from "../../../core/scheme/pseudo"
import {guid, string} from "../../../core/scheme/string"
import {number} from "../../../core/scheme/number"
import {array} from "../../../core/scheme/array"
import {LevelProperty} from "../../infrastructure/configurations/Property"
import {PlayerStateStatus} from "../../infrastructure/configurations/PlayerState"
import {GameStatus} from "../../infrastructure/configurations/Game"

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
        name: string()
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

export namespace GetStateGame {
    const Player = () => object({
        name: string(),
        amountMoney: number(),
        positionOnMap: optional(number()),
        state: enumerate([
            PlayerStateStatus.ACTIVE,
            PlayerStateStatus.WINNER,
            PlayerStateStatus.GAVE_UP,
            PlayerStateStatus.BANKRUPT
        ])
    })
    const Property = () => object({
        playerName: string(),
        propertyId: number(),
        level: enumerate([
            LevelProperty.ZERO,
            LevelProperty.FIRST,
            LevelProperty.SECOND,
            LevelProperty.THIRD,
            LevelProperty.FOURTH,
            LevelProperty.FIFTH
        ])
    })

    export const PathVariables = () => object({
        gameToken: guid()
    })
    export const Request = empty
    export const Response = () => object({
        gameState: enumerate([
            GameStatus.RECRUITMENT_OF_PLAYERS,
            GameStatus.PREPARATION,
            GameStatus.ACTIVE,
            GameStatus.GAME_OVER
        ]),
        currentPlayer: optional(string()),
        players: optional(array(Player())),
        playersQueue: optional(array(string())),
        property: optional(array(Property()))
    })
}

export namespace MakeMove {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: guid()
    })
    export const Response = () => object({
        diceValues: array(number()),
        currentPosition: number()
    })
}
