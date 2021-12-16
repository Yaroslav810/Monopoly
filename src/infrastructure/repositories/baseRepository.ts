import {DbContext} from "../dbContext/context"

export abstract class BaseRepository {
    protected constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    protected readonly dbContext: DbContext
}
