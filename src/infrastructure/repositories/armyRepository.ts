import {DbContext} from "../dbContext/context"

export type {ArmyRepository}

export function armyRepository(dbContext: DbContext): ArmyRepository {
    if (!instance) {
        instance = new ArmyRepository(dbContext)
    }

    return instance
}

let instance: ArmyRepository

class ArmyRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(armyId: string) {
        return this.dbContext.army.findByPk(armyId)
    }
}
