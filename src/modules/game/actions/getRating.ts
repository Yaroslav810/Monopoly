import { Team } from "../../../constants/Team";

export const getRating = async () => {
  return {
    railways: [
      {
        team_id: Team.SOUTH_EASTERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: Team.PACIFIC_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: Team.SOUTH_WESTERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: Team.NORTHERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: Team.NEW_YORK_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: Team.TEXAS_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      }
    ],
    policies: [
      {
        team_id: Team.FEDERATION,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5,
      },
      {
        team_id: Team.CONFEDERATION,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      },
      {
        team_id: Team.REPUBLIC,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      }
    ],
    tradingCompanies: [
      {
        team_id: Team.PRESCOTT,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: Team.WASHINGTON,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: Team.BISMARCK,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: Team.LITTLE_ROCK,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75,
      },
    ]
  }
}
