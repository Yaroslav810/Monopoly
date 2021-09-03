import {object} from "../../../core/scheme/object";
import {guid, string} from "../../../core/scheme/string";
import {empty} from "../../../core/scheme/raw";

export const CreatePlayer = {
    PathVariables: empty,
    Request: () => object({
        name: string(),
        gameToken: guid()
    }),
    Response: () => object({
        playerToken: guid(),
    })
}
