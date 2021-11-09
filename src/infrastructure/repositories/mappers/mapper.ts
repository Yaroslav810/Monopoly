import {Game} from "../../../model/entities/Game"
import {Player} from "../../../model/entities/Player"
import {Politician} from "../../../model/entities/Politician"
import {GameModel} from "../../configurations/Game"
import {PlayerModel} from "../../configurations/Player"
import {PoliticianModel} from "../../configurations/Politician"

export function MapToGame(game: GameModel): Game {
    return new Game(
        game.id,
        game.state,
        game.currentMove
    )
}

export function MapToPlayer(player: PlayerModel): Player {
    return new Player(
        player.id,
        player.gameId,
        player.name,
        player.team
    )
}

export function MapToPolitician(politician: PoliticianModel): Politician {
    return new Politician(
        politician.id,
        politician.playerId,
        politician.budgetUnits,
        politician.numberMovementArmyBlanks,
        politician.numberPrBlanks,
        politician.numberRailwayConstructionBlanks,
        politician.numberWarehouseConstructionBlanks,
        politician.numberNegotiationsWithIndiansBlanks,
        politician.numberNewBlanks
    )
}
