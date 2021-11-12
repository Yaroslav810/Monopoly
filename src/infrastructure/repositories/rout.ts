import {DbContext} from "../dbContext/context"

export type {RoutRepository}

export function routRepository(dbContext: DbContext): RoutRepository {
    if (!instance) {
        instance = new RoutRepository(dbContext)
    }

    return instance
}

let instance: RoutRepository

class RoutRepository {
    private readonly dbContext: DbContext

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(routId: string) {
        return this.dbContext.rout.findByPk(routId)
    }
}
