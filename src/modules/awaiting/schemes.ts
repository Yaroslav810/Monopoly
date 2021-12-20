import {empty} from "../../../core/scheme/pseudo"
import {object} from "../../../core/scheme/object"
import {string} from "../../../core/scheme/string"

export namespace StartGame {
    export const PathVariables = empty
    export const Request = () => object({
        playerToken: string()
    })
    export const Response = () => empty
}
