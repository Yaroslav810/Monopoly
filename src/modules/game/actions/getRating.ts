import {Context} from "../../../../core/routing/IRouter";
import {DataProvider} from "../../../model/DataProvider";
import {SessionStorage} from "../../../model/SessionStorage";

export async function getRating(_: Context<DataProvider, SessionStorage>) {
  return {
    railways: [
      {
        team_name: 'Техасская',
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_name: 'Нью-Йоркская',
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_name: 'Северная',
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_name: 'Юго-западная',
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_name: 'Тихоокеанская',
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      },
      {
        team_name: 'Юго-восточная',
        ratingChange1: 8,
        ratingChange2: 12,
        ratingChange3: -2,
        rating: 124
      }
    ],
    policies: [
      {
        team_name: 'Республика',
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5,
      },
      {
        team_name: 'Конфедерация',
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      },
      {
        team_name: 'Федерация',
        ratingChange1: 2,
        ratingChange2: 2,
        ratingChange3: 2,
        rating: 5
      }
    ],
    tradingCompanies: [
      {
        team_name: 'ТК Вашингтона',
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_name: 'ТК Прескотта',
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_name: 'ТК Литл-Рока',
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75
      },
      {
        team_name: 'ТК Бисмарка',
        ratingChange1: 55,
        ratingChange2: -35,
        ratingChange3: -22,
        rating: 75,
      },
    ]
  }
}
