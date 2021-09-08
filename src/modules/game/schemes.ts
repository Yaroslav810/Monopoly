import { object } from "../../../core/scheme/object";
import { empty } from "../../../core/scheme/raw";
import { guid } from "../../../core/scheme/string";

export namespace CreateGame {
  export const PathVariables = empty
  export const Request = empty
  export const Response = () => object({
    gameToken: guid(),
    gameTechnician: guid()
  })
}
