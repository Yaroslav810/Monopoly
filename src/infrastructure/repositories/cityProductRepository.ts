import {DbContext} from "../dbContext/context"

export type {CityProductRepository}

export function cityProductRepository(dbContext: DbContext): CityProductRepository {
    if (!instance) {
        instance = new CityProductRepository(dbContext)
    }

    return instance
}

let instance: CityProductRepository

class CityProductRepository {
    private readonly dbContext: DbContext

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(cityProductId: string) {
        return this.dbContext.cityProduct.findByPk(cityProductId)
    }
}
