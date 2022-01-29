import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {GameState} from "./mappers/entities/GameState"
import {MapToGameState} from "./mappers/mapper"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class GameStateRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async createGameState(gameId: string, currentPlayer: string, chanceQueueId: string, publicTreasureQueueId: string) {
        return MapToGameState(
            await this.dbContext.gameState.create({
                id: generateUUId(),
                gameId: gameId,
                currentPlayer: currentPlayer,
                chanceQueueId: chanceQueueId,
                publicTreasureQueueId: publicTreasureQueueId
            })
        )
    }

    async getGameStateById(id: string): Promise<GameState | null> {
        const gameState = await this.dbContext.gameState.findByPk(id)
        return gameState ? MapToGameState(gameState) : null
    }

    async getGameStateByGameId(gameId: string): Promise<GameState | null> {
        const gameState = await this.dbContext.gameState.findOne({
            where: {
                gameId: gameId
            }
        })
        return gameState ? MapToGameState(gameState) : null
    }

    async updateGameState(gameState: GameState): Promise<void> {
        await this.dbContext.gameState.update({
            currentPlayer: gameState.getCurrentPlayer(),
            chanceQueueId: gameState.getChanceQueueId(),
            publicTreasureQueueId: gameState.getPublicTreasureQueueId()
        }, {
            where: {
                id: gameState.getId()
            }
        })
    }
}

export type {GameStateRepository}

export function initGameStateRepository(dbContext: DbContext) {
    return new GameStateRepository(dbContext)
}
