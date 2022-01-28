import {DbContext} from "../dbContext/context"
import {PlayerQueue} from "./mappers/entities/PlayerQueue"
import {BaseRepository} from "./baseRepository"
import {MapToPlayerQueue} from "./mappers/mapper"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class PlayerQueueRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async createPlayerQueue(player: {playerId: string, numberInQueue: number}) {
        return MapToPlayerQueue(
            await this.dbContext.playerQueue.create({
                id: generateUUId(),
                playerId: player.playerId,
                numberInQueue: player.numberInQueue
            })
        )
    }

    async getPlayerQueueById(id: string): Promise<PlayerQueue | null> {
        const playerQueue = await this.dbContext.playerQueue.findByPk(id)
        return playerQueue ? MapToPlayerQueue(playerQueue) : null
    }

    async getPlayerQueueByPlayerId(playerId: string): Promise<PlayerQueue | null> {
        const playerQueue = await this.dbContext.playerQueue.findOne({
            where: {
                playerId: playerId
            }
        })
        return playerQueue ? MapToPlayerQueue(playerQueue) : null
    }
}

export type {PlayerQueueRepository}

export function initPlayerQueueRepository(dbContext: DbContext) {
    return new PlayerQueueRepository(dbContext)
}

