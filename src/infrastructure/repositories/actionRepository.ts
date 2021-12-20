import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {Action} from "./mappers/entities/Action"
import {MapToAction} from "./mappers/mapper"

class ActionRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getActionById(id: string): Promise<Action | null> {
        const action = await this.dbContext.action.findByPk(id)
        return action ? MapToAction(action) : null
    }
}

export type {ActionRepository}

export function initActionRepository(dbContext: DbContext) {
    return new ActionRepository(dbContext)
}
