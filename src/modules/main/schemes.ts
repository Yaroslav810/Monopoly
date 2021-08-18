import {object} from "../../../core/scheme/object";
import {string} from "../../../core/scheme/string";
import {empty} from "../../../core/scheme/raw";

export const SayHello = {
    PathVariables: () => object({name: string()}),
    Request: empty,
    Response: () => object({message: string()}),
}