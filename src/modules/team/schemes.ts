import { object } from "../../../core/scheme/object";
import { empty, enumerate } from "../../../core/scheme/raw";
import { guid } from "../../../core/scheme/string";
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
