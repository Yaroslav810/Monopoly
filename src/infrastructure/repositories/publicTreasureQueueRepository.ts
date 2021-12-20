import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {PublicTreasureQueue} from "./mappers/entities/PublicTreasureQueue"
import {MapToPublicTreasureQueue} from "./mappers/mapper"

class PublicTreasureQueueRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getPublicTreasureQueueById(id: string): Promise<PublicTreasureQueue | null> {
        const publicTreasureQueue = await this.dbContext.publicTreasureQueue.findByPk(id)
        return publicTreasureQueue ? MapToPublicTreasureQueue(publicTreasureQueue) : null
    }
}

export type {PublicTreasureQueueRepository}

export function initPublicTreasureQueueRepository(dbContext: DbContext) {
    return new PublicTreasureQueueRepository(dbContext)
}

