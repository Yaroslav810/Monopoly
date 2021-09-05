import { array } from "../../../core/scheme/array";
import { number } from "../../../core/scheme/number";
import { object } from "../../../core/scheme/object";
import { empty, enumerate } from "../../../core/scheme/raw";
import { guid } from "../../../core/scheme/string";
import { Team } from "../../constants/Team";

export namespace ReserveTeam {
  export const PathVariables = empty
  export const Request = () => object({
    playerToken: guid(),
    teamId: enumerate([
      Team.SOUTH_EASTERN_RAILWAY,
      Team.PACIFIC_RAILWAY,
      Team.SOUTH_WESTERN_RAILWAY,
      Team.NORTHERN_RAILWAY,
      Team.NEW_YORK_RAILWAY,
      Team.TEXAS_RAILWAY,
      Team.FEDERATION,
      Team.CONFEDERATION,
      Team.REPUBLIC,
      Team.PRESCOTT,
      Team.WASHINGTON,
      Team.BISMARCK,
      Team.LITTLE_ROCK
    ])
  })
  export const Response = () => empty
}

export namespace FreeTeam {
  export const PathVariables = empty
  export const Request = () => object({
    gameToken: guid(),
  })
  export const Response = () => array(number())
}
