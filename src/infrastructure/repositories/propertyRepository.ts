import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {Property} from "./mappers/entities/Property"
import {MapToProperty} from "./mappers/mapper"
import {generateUUId} from "../../../core/utils/UUIDUtils"
import {LevelProperty} from "../configurations/Property"

class PropertyRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async createProperty(playerId: string, propertyId: number) {
        return MapToProperty(
            await this.dbContext.property.create({
                id: generateUUId(),
                playerId: playerId,
                propertyId: propertyId,
                numberInQueue: 0,
                level: LevelProperty.ZERO
            })
        )
    }

    async getPropertyById(id: string): Promise<Property | null> {
        const property = await this.dbContext.property.findByPk(id)
        return property ? MapToProperty(property) : null
    }

    async getPropertiesByPlayerId(playerId: string): Promise<Property[]> {
        const properties = await this.dbContext.property.findAll({
            where: {
                playerId: playerId
            },
            order: ["updatedAt"]
        })
        return properties.map(property => MapToProperty(property))
    }
}

export type {PropertyRepository}

export function initPropertyRepository(dbContext: DbContext) {
    return new PropertyRepository(dbContext)
}

