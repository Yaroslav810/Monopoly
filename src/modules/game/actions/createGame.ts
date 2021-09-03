import { Action } from "../../_common/Action"
import { CreateGame } from "../schemes"

export const createGame: Action<typeof CreateGame> = async ({dataProvider}) => {
    const game = await dataProvider.game.create()
    await game.save()
    return {
        session: game.id
    }
}
