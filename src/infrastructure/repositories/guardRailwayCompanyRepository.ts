import {DbContext} from "../dbContext/context"

export type { GuardRailwayCompanyRepository }

export function guardRailwayCompanyRepository(dbContext: DbContext): GuardRailwayCompanyRepository {
    if (!instance) {
        instance = new GuardRailwayCompanyRepository(dbContext)
    }

    return instance
}

let instance: GuardRailwayCompanyRepository

class GuardRailwayCompanyRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(guardRailwayCompanyId: string) {
        return this.dbContext.guardRailwayCompany.findByPk(guardRailwayCompanyId)
    }
}
