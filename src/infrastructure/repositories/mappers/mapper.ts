import {Game} from "./entities/Game"
import {Player} from "./entities/Player"
import {GameModel} from "../../configurations/Game"
import {PlayerModel} from "../../configurations/Player"
import {PlayerStateModel} from "../../configurations/PlayerState"
import {PlayerState} from "./entities/PlayerState"
import {PlayerQueue} from "./entities/PlayerQueue"
import {PlayerQueueModel} from "../../configurations/PlayerQueue"
import {ChanceQueue} from "./entities/ChanceQueue"
import {ChanceQueueModel} from "../../configurations/ChanceQueue"
import {PublicTreasureQueueModel} from "../../configurations/PublicTreasureQueue"
import {PublicTreasureQueue} from "./entities/PublicTreasureQueue"
import {Property} from "./entities/Property"
import {PropertyModel} from "../../configurations/Property"
import {GameState} from "./entities/GameState"
import {GameStateModel} from "../../configurations/GameState"
import {Action} from "./entities/Action"
import {ActionModel} from "../../configurations/Action"
import {MotionAction} from "./entities/MotionAction"
import {MotionActionModel} from "../../configurations/MotionAction"

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

export function MapToPlayerState(playerState: PlayerStateModel): PlayerState {
    return new PlayerState(
        playerState.id,
        playerState.playerId,
        playerState.amountMoney,
        playerState.state
    )
}

export function MapToPlayerQueue(playerQueue: PlayerQueueModel): PlayerQueue {
    return new PlayerQueue(
        playerQueue.id,
        playerQueue.playerId,
        playerQueue.numberInQueue
    )
}

export function MapToChanceQueue(chanceQueue: ChanceQueueModel): ChanceQueue {
    return new ChanceQueue(
        chanceQueue.id,
        chanceQueue.gameId,
        chanceQueue.chanceCardId,
        chanceQueue.numberInQueue
    )
}

export function MapToPublicTreasureQueue(publicTreasureQueue: PublicTreasureQueueModel): PublicTreasureQueue {
    return new PublicTreasureQueue(
        publicTreasureQueue.id,
        publicTreasureQueue.gameId,
        publicTreasureQueue.publicTreasureCardId,
        publicTreasureQueue.numberInQueue
    )
}

export function MapToProperty(property: PropertyModel): Property {
    return new Property(
        property.id,
        property.playerId,
        property.propertyId,
        property.numberInQueue,
        property.level
    )
}

export function MapToGameState(gameState: GameStateModel): GameState {
    return new GameState(
        gameState.id,
        gameState.gameId,
        gameState.currentPlayer,
        gameState.chanceQueueId,
        gameState.publicTreasureQueue
    )
}

export function MapToAction(action: ActionModel): Action {
    return new Action(
        action.id,
        action.gameId,
        action.numberInQueue,
        action.type,
        action.actionId
    )
}

export function MapToMotionAction(motionAction: MotionActionModel): MotionAction {
    return new MotionAction(
        motionAction.id,
        motionAction.playerId,
        motionAction.firstCube,
        motionAction.secondCube
    )
}
