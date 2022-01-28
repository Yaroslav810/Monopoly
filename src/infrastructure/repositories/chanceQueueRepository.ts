import {DbContext} from "../dbContext/context"
import {ChanceQueue} from "./mappers/entities/ChanceQueue"
import {BaseRepository} from "./baseRepository"
import {MapToChanceQueue} from "./mappers/mapper"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class ChanceQueueRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async createChanceQueue(gameId: string, chanceCardId: number, numberInQueue: number) {
        return MapToChanceQueue(
            await this.dbContext.chanceQueue.create({
                id: generateUUId(),
                gameId: gameId,
                chanceCardId: chanceCardId,
                numberInQueue: numberInQueue
            })
        )
    }

    async getChanceQueueById(id: string): Promise<ChanceQueue | null> {
        const chanceQueue = await this.dbContext.chanceQueue.findByPk(id)
        return chanceQueue ? MapToChanceQueue(chanceQueue) : null
    }
}

export type {ChanceQueueRepository}

export function initChanceQueueRepository(dbContext: DbContext) {
    return new ChanceQueueRepository(dbContext)
}
