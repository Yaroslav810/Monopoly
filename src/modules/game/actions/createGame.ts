import {Action} from "../../_common/Action"
import {CreateGame} from "../schemes"

export const createGame: Action<typeof CreateGame> = async ({dataProvider}) => {
    const game = await dataProvider.game.create()
    const technician = await dataProvider.player.createGameTechnician(game.id)
    
    return {
        gameToken: game.id,
        gameTechnician: technician.id
    }
}
