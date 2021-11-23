import {DbContext} from "../dbContext/context"

export type {RailwayRepository}

export function railwayRepository(dbContext: DbContext): RailwayRepository {
    if (!instance) {
        instance = new RailwayRepository(dbContext)
    }

    return instance
}

let instance: RailwayRepository

class RailwayRepository {
    private readonly dbContext: DbContext

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(railwayId: string) {
        return this.dbContext.railway.findByPk(railwayId)
    }
}
