import { array } from "../../../../core/scheme/array";
import { object } from "../../../../core/scheme/object";
import { number } from "../../../../core/scheme/number";

export function RatingResponse() {
  const ratingItem = object({
    team_id: number(),
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

export function RolesResponse() {
  const rolesItem = object({
    role_id: number(),
    players_id: array(number())
  })

  return object({
    railways: rolesItem,
    policies: rolesItem,
    tradingCompanies: rolesItem
  })
}
