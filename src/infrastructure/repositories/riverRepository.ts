import {DbContext} from "../dbContext/context"

export type {RiverRepository}

export function riverRepository(dbContext: DbContext): RiverRepository {
    if (!instance) {
        instance = new RiverRepository(dbContext)
    }

    return instance
}

let instance: RiverRepository

class RiverRepository {
    private readonly dbContext: DbContext

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(riverId: string) {
        return this.dbContext.river.findByPk(riverId)
    }
}
