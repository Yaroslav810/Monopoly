import {DbContext} from "../dbContext/context"

export type { RailwayCompanyOfficeRepository }

export function railwayCompanyOfficeRepository(dbContext: DbContext): RailwayCompanyOfficeRepository {
    if (!instance) {
        instance = new RailwayCompanyOfficeRepository(dbContext)
    }

    return instance
}

let instance: RailwayCompanyOfficeRepository

class RailwayCompanyOfficeRepository {
    private readonly dbContext: DbContext

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(railwayCompanyOfficeId: string) {
        return this.dbContext.railwayCompanyOffice.findByPk(railwayCompanyOfficeId)
    }
}
