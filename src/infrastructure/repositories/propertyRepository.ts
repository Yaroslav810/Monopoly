import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {Property} from "../../model/entities/Property"
import {MapToProperty} from "./mappers/mapper"

export class PropertyRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getPropertyById(id: string): Promise<Property | null> {
        const property = await this.dbContext.property.findByPk(id)
        return property ? MapToProperty(property) : null
    }
}
