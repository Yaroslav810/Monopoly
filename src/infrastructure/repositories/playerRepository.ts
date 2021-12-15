import {DbContext} from "../dbContext/context"
import {Player} from "../../model/entities/Player"
import {generateUUId} from "../../../core/utils/UUIDUtils"
import {MapToPlayer} from "./mappers/mapper"

export type {PlayerRepository}

export function playerRepository(dbContext: DbContext): PlayerRepository {
    if (!instance) {
        instance = new PlayerRepository(dbContext)
    }

    return instance
}

let instance: PlayerRepository

class PlayerRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    async createPlayer(player: {gameId: string, name: string}): Promise<Player> {
        return MapToPlayer(
            await this.dbContext.player.create({
                id: generateUUId(),
                gameId: player.gameId,
                name: player.name
            })
        )
    }

    async getPlayerById(id: string): Promise<Player | null> {
        const player = await this.dbContext.player.findByPk(id)
        return player ? MapToPlayer(player) : null
    }

    async getPlayersByGameId(gameId: string): Promise<Player[]> {
        const players = await this.dbContext.player.findAll({
            where: {
                gameId: gameId
            },
            order: ["updatedAt"]
        })
        return players.map(player => MapToPlayer(player))
    }

    async updatePlayer(player: Player): Promise<void> {
        await this.dbContext.player.update({
            gameId: player.getGameId(),
            name: player.getName()
        }, {
            where: {
                id: player.getId()
            }
        })
    }

    async deletePlayer(playerId: string): Promise<number> {
        return this.dbContext.player.destroy({
            where: {
                id: playerId
            }
        })
    }
}
