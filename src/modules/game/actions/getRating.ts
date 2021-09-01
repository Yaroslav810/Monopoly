import {TeamId} from "../../../constants/Team";

export const getRating = async () => {
  return {
    railways: [
      {
        team_id: TeamId.SOUTH_EASTERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: TeamId.PACIFIC_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: TeamId.SOUTH_WESTERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: TeamId.NORTHERN_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: TeamId.NEW_YORK_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_id: TeamId.TEXAS_RAILWAY,
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      }
    ],
    policies: [
      {
        team_id: TeamId.FEDERATION,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5,
      },
      {
        team_id: TeamId.CONFEDERATION,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      },
      {
        team_id: TeamId.REPUBLIC,
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      }
    ],
    tradingCompanies: [
      {
        team_id: TeamId.PRESCOTT,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: TeamId.WASHINGTON,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: TeamId.BISMARCK,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_id: TeamId.LITTLE_ROCK,
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75,
      },
    ]
  }
}
