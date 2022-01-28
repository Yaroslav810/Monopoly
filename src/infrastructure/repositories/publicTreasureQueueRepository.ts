import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {PublicTreasureQueue} from "./mappers/entities/PublicTreasureQueue"
import {MapToPublicTreasureQueue} from "./mappers/mapper"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class PublicTreasureQueueRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async createPublicTreasureQueue(gameId: string, publicTreasureCardId: number, numberInQueue: number) {
        return MapToPublicTreasureQueue(
            await this.dbContext.publicTreasureQueue.create({
                id: generateUUId(),
                gameId: gameId,
                publicTreasureCardId: publicTreasureCardId,
                numberInQueue: numberInQueue
            })
        )
    }

    async getPublicTreasureQueueById(id: string): Promise<PublicTreasureQueue | null> {
        const publicTreasureQueue = await this.dbContext.publicTreasureQueue.findByPk(id)
        return publicTreasureQueue ? MapToPublicTreasureQueue(publicTreasureQueue) : null
    }

    async getPublicTreasureQueueByGameIdAndNumberInQueue(gameId: string, numberInQueue: number): Promise<PublicTreasureQueue | null> {
        const publicTreasureQueue = await this.dbContext.publicTreasureQueue.findOne({
            where: {
                gameId: gameId,
                numberInQueue: numberInQueue
            }
        })
        return publicTreasureQueue ? MapToPublicTreasureQueue(publicTreasureQueue) : null
    }
}

export type {PublicTreasureQueueRepository}

export function initPublicTreasureQueueRepository(dbContext: DbContext) {
    return new PublicTreasureQueueRepository(dbContext)
}

