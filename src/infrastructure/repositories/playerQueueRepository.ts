import {DbContext} from "../dbContext/context"
import {PlayerQueue} from "../../model/entities/PlayerQueue"
import {BaseRepository} from "./baseRepository"
import {MapToPlayerQueue} from "./mappers/mapper"

export class PlayerQueueRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getPlayerQueueById(id: string): Promise<PlayerQueue | null> {
        const playerQueue = await this.dbContext.playerQueue.findByPk(id)
        return playerQueue ? MapToPlayerQueue(playerQueue) : null
    }
}
