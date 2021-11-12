import {DbContext} from "../dbContext/context"

export type { StaticObjectRepository }

export function staticObjectRepository(dbContext: DbContext): StaticObjectRepository {
    if (!instance) {
        instance = new StaticObjectRepository(dbContext)
    }

    return instance
}

let instance: StaticObjectRepository

class StaticObjectRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(staticObjectId: string) {
        return this.dbContext.staticObject.findByPk(staticObjectId)
    }
}
