import {object} from "../../../core/scheme/object";
import {guid, string} from "../../../core/scheme/string";
import {empty} from "../../../core/scheme/raw";

export const CreateUser = {
    PathVariables: empty,
    Request: () => object({name: string()}),
    Response: () => object({
        id: guid(),
        name: string(),
    }),
}

export const GetUser = {
    PathVariables: () => object({userId: guid()}),
    Request: empty,
    Response: () => object({
        id: guid(),
        name: string(),
    }),
}