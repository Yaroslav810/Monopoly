import {array} from "../../../core/scheme/array";
import {object} from "../../../core/scheme/object";
import {number} from "../../../core/scheme/number";
import {empty} from "../../../core/scheme/raw";
import { guid } from "../../../core/scheme/string";

const RatingItem = () => object({
  team_id: number(),
  ratingChange1: number(),
  ratingChange2: number(),
  ratingChange3: number(),
  rating: number()
})

export namespace Rating {
  export const PathVariables = empty
  export const Request = empty
  export const Response = () => object({
    railways: array(RatingItem()),
    policies: array(RatingItem()),
    tradingCompanies: array(RatingItem())
  })
}

export namespace Roles {
  export const PathVariables = empty
  export const Request = empty
  export const Response = () => array(number())
}

export namespace CreateGame {
  export const PathVariables = empty
  export const Request = empty
  export const Response = () => object({
    session: guid()
  })
}
