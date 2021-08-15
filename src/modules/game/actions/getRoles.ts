import {Context} from "../../../../core/routing/IRouter";
import {DataProvider} from "../../../model/DataProvider";
import {SessionStorage} from "../../../model/SessionStorage";

export async function getRoles(_: Context<DataProvider, SessionStorage>) {
  return {
    railways: {
      name: 'Железнодорожник',
      player: [
        'Юго-восточная ж/д',
        'Тихоокеанская ж/д',
        'Юго-западная ж/д',
        'Северная ж/д',
        'Нью-Йоркская ж/д',
        'Техасская ж/д'
      ]
    },
    policies: {
      name: 'Торговец',
      player: [
        'ТК Прескотта',
        'ТК Вашингтона',
        'ТК Бисмарка',
        'ТК Литтл-Рока'
      ]
    },
    tradingCompanies: {
      name: 'Политик',
      player: [
        'Федерация',
        'Конфедерация',
        'Республика'
      ]
    }
  }
}
