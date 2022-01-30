import {empty, enumerate, optional} from "../../../core/scheme/pseudo"
import {object} from "../../../core/scheme/object"
import {string} from "../../../core/scheme/string"
import {GameStatus} from "../../infrastructure/configurations/Game"
import {array} from "../../../core/scheme/array"
import {number} from "../../../core/scheme/number"
import {PlayerStateStatus} from "../../infrastructure/configurations/PlayerState"
import {LevelProperty} from "../../infrastructure/configurations/Property"

export namespace StartGame {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: string()
    })
    export const Response = () => empty
}

export namespace GameProgress {
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
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: string()
    })
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
