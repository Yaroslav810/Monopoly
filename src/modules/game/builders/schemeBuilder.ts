import { array } from "./../../../../core/scheme/array";
import { object } from "./../../../../core/scheme/object";
import { string } from "./../../../../core/scheme/string";
import { number } from "./../../../../core/scheme/number";

export function getRatingResponseScheme() {
  return object({
      railways: array(object({
          team_name: string(),
          ratingChange1: number(),
          ratingChange2: number(),
          ratingChange3: number(),
          rating: number()
      })),
      policies: array(object({
          team_name: string(),
          ratingChange1: number(),
          ratingChange2: number(),
          ratingChange3: number(),
          rating: number()
      })),
      tradingCompanies: array(object({
          team_name: string(),
          ratingChange1: number(),
          ratingChange2: number(),
          ratingChange3: number(),
          rating: number()
      }))
  })
}
