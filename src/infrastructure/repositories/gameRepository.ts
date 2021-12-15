import {DbContext} from "../dbContext/context"
import {GameStatus} from "../configurations/Game"
import {Game} from "../../model/entities/Game"
import {generateUUId} from "../../../core/utils/UUIDUtils"
import {MapToGame} from "./mappers/mapper"

class GameRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    async createGame(numberPlayers: number): Promise<Game> {
        return MapToGame(
            await this.dbContext.game.create({
                id: generateUUId(),
                numberPlayers: numberPlayers,
                state: GameStatus.RECRUITMENT_OF_PLAYERS
            })
        )
    }

    async getGameById(id: string): Promise<Game | null> {
        const game = await this.dbContext.game.findByPk(id)
        return game ? MapToGame(game) : null
    }

    async updateGame(game: Game): Promise<void> {
        await this.dbContext.game.update({
            numberPlayers: game.getNumberPlayers(),
            state: game.getState()
        }, {
            where: {
                id: game.getId()
            }
        })
    }

    async getGamesByState(state: GameStatus): Promise<Game[]> {
        const games = await this.dbContext.game.findAll({
            where: {
                state: state
            }
        })

        return games.map(game => MapToGame(game))
    }
}

let instance: GameRepository

export type {GameRepository}

export function gameRepository(dbContext: DbContext): GameRepository {
    if (!instance) {
        instance = new GameRepository(dbContext)
    }

    return instance
}
