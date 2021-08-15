import { array } from "./../../../../core/scheme/array";
import { object } from "./../../../../core/scheme/object";
import { string } from "./../../../../core/scheme/string";
import { number } from "./../../../../core/scheme/number";

export function getRatingResponseScheme() {
  const ratingItem = object({
    team_name: string(),
    ratingChange1: number(),
    ratingChange2: number(),
    ratingChange3: number(),
    rating: number()
  })

  return object({
      railways: array(ratingItem),
      policies: array(ratingItem),
      tradingCompanies: array(ratingItem)
  })
}

export function getRolesResponseScheme() {
  const rolesItem = object({
    name: string(),
    player: array(string())
  })

  return object({
    railways: rolesItem,
    policies: rolesItem,
    tradingCompanies: rolesItem
  })
}
