import {DbContext} from "../dbContext/context"

export type {CityRepository}

export function cityRepository(dbContext: DbContext): CityRepository {
    if (!instance) {
        instance = new CityRepository(dbContext)
    }

    return instance
}

let instance: CityRepository

class CityRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(cityId: string) {
        return this.dbContext.city.findByPk(cityId)
    }
}
