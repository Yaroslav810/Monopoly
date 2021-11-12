import {DbContext} from "../dbContext/context"

export type { NativeAmericanRepository }

export function nativeAmericanRepository(dbContext: DbContext): NativeAmericanRepository {
    if (!instance) {
        instance = new NativeAmericanRepository(dbContext)
    }

    return instance
}

let instance: NativeAmericanRepository

class NativeAmericanRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    get(nativeAmericanId: string) {
        return this.dbContext.nativeAmerican.findByPk(nativeAmericanId)
    }
}
