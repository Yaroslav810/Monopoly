import {Game} from "../../../model/entities/Game"
import {Player} from "../../../model/entities/Player"
import {GameModel} from "../../configurations/Game"
import {PlayerModel} from "../../configurations/Player"

export function MapToGame(game: GameModel): Game {
    return new Game(
        game.id,
        game.numberPlayers,
        game.state
    )
}

export function MapToPlayer(player: PlayerModel): Player {
    return new Player(
        player.id,
        player.gameId,
        player.name
    )
}
