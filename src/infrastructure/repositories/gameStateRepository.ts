import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {GameState} from "../../model/entities/GameState"
import {MapToGameState} from "./mappers/mapper"

export class GameStateRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getGameStateById(id: string): Promise<GameState | null> {
        const gameState = await this.dbContext.gameState.findByPk(id)
        return gameState ? MapToGameState(gameState) : null
    }
}
