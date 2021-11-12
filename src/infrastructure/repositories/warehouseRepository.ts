import {DbContext} from "../dbContext/context"

export type { WarehouseRepository }

export function warehouseRepository(dbContext: DbContext): WarehouseRepository {
    if (!instance) {
        instance = new WarehouseRepository(dbContext)
    }

    return instance
}

let instance: WarehouseRepository

class WarehouseRepository {
    private readonly dbContext: DbContext

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(warehouseId: string) {
        return this.dbContext.warehouse.findByPk(warehouseId)
    }
}
