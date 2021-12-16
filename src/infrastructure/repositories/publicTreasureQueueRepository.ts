import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {MapToPublicTreasureQueue} from "./mappers/mapper"
import {PublicTreasureQueue} from "../../model/entities/PublicTreasureQueue"

export class PublicTreasureQueueRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getPublicTreasureQueueById(id: string): Promise<PublicTreasureQueue | null> {
        const publicTreasureQueue = await this.dbContext.publicTreasureQueue.findByPk(id)
        return publicTreasureQueue ? MapToPublicTreasureQueue(publicTreasureQueue) : null
    }
}
