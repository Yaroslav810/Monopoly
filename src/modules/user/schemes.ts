import {object} from "../../../core/scheme/object";
import {guid, string} from "../../../core/scheme/string";
import {empty} from "../../../core/scheme/raw";

export const CreateUser = {
    PathVariables: empty,
    Request: () => object({name: string()}),
    Response: () => object({
        uuid: guid(),
        name: string(),
    }),
}

export const GetUser = {
    PathVariables: () => object({userUuid: guid()}),
    Request: empty,
    Response: () => object({
        uuid: guid(),
        name: string(),
    }),
}