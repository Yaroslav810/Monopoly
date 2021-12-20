import {DbContext} from "../dbContext/context"
import {PlayerQueue} from "./mappers/entities/PlayerQueue"
import {BaseRepository} from "./baseRepository"
import {MapToPlayerQueue} from "./mappers/mapper"

class PlayerQueueRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getPlayerQueueById(id: string): Promise<PlayerQueue | null> {
        const playerQueue = await this.dbContext.playerQueue.findByPk(id)
        return playerQueue ? MapToPlayerQueue(playerQueue) : null
    }
}

export type {PlayerQueueRepository}

export function initPlayerQueueRepository(dbContext: DbContext) {
    return new PlayerQueueRepository(dbContext)
}

