import {Action} from "../../_common/Action"
import {GetAvailable} from "../schemes"


export const getAvailableGames: Action<typeof GetAvailable> = async ({dataProvider}) => {
    return {
        games: await dataProvider.game.getAvailableGames()
    }
}
