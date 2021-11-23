import {DbContext} from "../dbContext/context"
import {generateUUId} from "../../../core/utils/UUIDUtils"
import {MapToGame} from "./mappers/mapper"
import {Game} from "../../model/entities/Game"
import {GameStatus} from "../configurations/Game"

let instance: GameRepository

class GameRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    async createGame() {
        return MapToGame(
            await this.dbContext.game.create({
                id: generateUUId(),
                state: GameStatus.PREPARATION,
                currentMove: 0
            })
        )
    }

    async getGameById(id: string): Promise<Game | null> {
        const game = await this.dbContext.game.findByPk(id)
        return game ? MapToGame(game) : null
    }

    async updateGame(game: Game): Promise<void> {
        await this.dbContext.game.update({
            state: game.getState(),
            currentMove: game.getCurrentMove()
        }, {
            where: {
                id: game.getId()
            }
        })
    }
}

export type {GameRepository}

export function gameRepository(dbContext: DbContext): GameRepository {
    if (!instance) {
        instance = new GameRepository(dbContext)
    }
    return instance
}
