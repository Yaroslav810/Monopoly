import { array } from "../../../core/scheme/array";
import { number } from "../../../core/scheme/number";
import { object } from "../../../core/scheme/object";
import { empty, enumerate } from "../../../core/scheme/raw";
import { guid, string } from "../../../core/scheme/string";
import { TeamId } from "../../constants/Team";

export namespace ReserveTeam {
  export const PathVariables = empty
  export const Request = () => object({
    playerToken: guid(),
    teamId: enumerate([
      TeamId.SOUTH_EASTERN_RAILWAY,
      TeamId.PACIFIC_RAILWAY,
      TeamId.SOUTH_WESTERN_RAILWAY,
      TeamId.NORTHERN_RAILWAY,
      TeamId.NEW_YORK_RAILWAY,
      TeamId.TEXAS_RAILWAY,
      TeamId.FEDERATION,
      TeamId.CONFEDERATION,
      TeamId.REPUBLIC,
      TeamId.PRESCOTT,
      TeamId.WASHINGTON,
      TeamId.BISMARCK,
      TeamId.LITTLE_ROCK
    ])
  })
  export const Response = () => empty
}

export namespace FreeTeams {
  export const PathVariables = empty
  export const Request = () => object({
    gameToken: guid(),
  })
  export const Response = () => array(number())
}

export namespace OccupiedTeams {
  const occupiedTeams = () => object({
    team: number(),
    name: string()
  })

  export const PathVariables = () => object({
    gameId: guid()
  })
  export const Request = empty
  export const Response = () => array(occupiedTeams())
}
