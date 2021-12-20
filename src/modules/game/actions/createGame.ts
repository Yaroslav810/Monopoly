import {Action} from "../../_common/Action"
import {CreateGame} from "../schemes"
import {ErrorText} from "../../../constants/ErrorText"
import {sendForbidden} from "../../../../core/http/httputils"
import {verifyNumberPlayers} from "../../_common/checks"


export const createGame: Action<typeof CreateGame> = async ({dataProvider}, _, {name, numberOfPlayers}) => {
    verifyNumberPlayers(numberOfPlayers)

    const game = await dataProvider.game.create(numberOfPlayers)
    const player = await dataProvider.player.createPlayer(game.getId(), name)
    if (!player) {
        sendForbidden(ErrorText.ERROR_ADD_PLAYER)
    }
    dataProvider.game.addPlayer(game.getId(), player.getId())

    return {
        gameToken: game.getId(),
        playerToken: player.getId()
    }
}
