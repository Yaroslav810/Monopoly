import {DbContext} from "../dbContext/context"
import {BaseRepository} from "./baseRepository"
import {MotionAction} from "../../model/entities/MotionAction"
import {MapToMotionAction} from "./mappers/mapper"

export class MotionActionRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getMotionActionById(id: string): Promise<MotionAction | null> {
        const motionAction = await this.dbContext.motionAction.findByPk(id)
        return motionAction ? MapToMotionAction(motionAction) : null
    }
}
