import { number } from "../../../core/scheme/number";
import { object } from "../../../core/scheme/object";
import { empty } from "../../../core/scheme/raw";
import { guid } from "../../../core/scheme/string";

export namespace ReserveTeam {
  export const PathVariables = empty
  export const Request = () => object({
    playerToken: guid(),
    teamId: number()
  })
  export const Response = () => empty
}
