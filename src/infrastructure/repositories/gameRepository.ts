import {DbContext} from "../dbContext/context"
import {generateUUId} from "../../../core/utils/UUIDUtils"
import {MapToGame} from "./mappers/mapper"
import {Game} from "../../model/entities/Game"

let instance: GameRepository

class GameRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    async createGame() {
        return MapToGame(
            await this.dbContext.game.create({
                id: generateUUId()
            })
        )
    }

    async getGameById(id: string) {
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

    // changeState(id: string, state: GameStatus) {
    //     return this.dbContext.game.update({
    //         state: state
    //     }, {
    //         where: {
    //             id: id
    //         }
    //     })
    // }
    //
    // async incrementMove(id: string): Promise<Game | null> {
    //     const game = await this.dbContext.game.findByPk(id)
    //     if (!game) {
    //         return null
    //     }
    //
    //     return game.increment("currentMove")
    // }
}

export type { GameRepository }

export function gameRepository(dbContext: DbContext): GameRepository {
    if (!instance) {
        instance = new GameRepository(dbContext)
    }

    return instance
}
