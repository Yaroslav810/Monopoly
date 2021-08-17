import {Context} from "../../../../core/routing/IRouter";
import {DataProvider} from "../../../model/DataProvider";
import {SessionStorage} from "../../../model/SessionStorage";
import { playerId } from "../../../model/Player";

export async function getRating(_: Context<DataProvider, SessionStorage>) {
  return {
    railways: [
      {
        team_id: playerId.SOUTH_EASTERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: playerId.PACIFIC_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: playerId.SOUTH_WESTERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: playerId.NORTHERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: playerId.NEW_YORK_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: playerId.TEXAS_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      }
    ],
    policies: [
      {
        team_id: playerId.FEDERATION,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5,
      },
      {
        team_id: playerId.CONFEDERATION,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      },
      {
        team_id: playerId.REPUBLIC,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      }
    ],
    tradingCompanies: [
      {
        team_id: playerId.PRESCOTT,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: playerId.WASHINGTON,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: playerId.BISMARCK,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: playerId.LITTLE_ROCK,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75,
      },
    ]
  }
}
