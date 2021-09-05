import {Model, ModelCtor, Options, Sequelize} from "sequelize";
import {verify} from "../utils/typeutils";

type ModelCreator<MODEL extends typeof Model, PROVIDER> = {
    readonly model: (s: Sequelize) => MODEL,
    readonly provider: (m: MODEL) => PROVIDER,
}

type Models<CREATORS extends {
    [key: string]: ModelCreator<ModelCtor<Model>, any>
}> = {
    [key in keyof CREATORS]: ReturnType<CREATORS[key]['model']>
}

type Providers<CREATORS extends {
    [key: string]: ModelCreator<ModelCtor<Model>, any>
}> = {
    [key in keyof CREATORS]: ReturnType<CREATORS[key]['provider']>
}

type DBSettings = {
    name: string,
    user: string,
    password: string,
    options?: Options,
}

export function initSequelizeDataProvider<CREATORS extends {
    [key: string]: ModelCreator<any, any>
}>(
    dbSettings: DBSettings,
    creators: CREATORS,
    bindRelationships: (m: Models<CREATORS>) => void,
): Promise<Providers<CREATORS>> {
    const sequelize = new Sequelize(
        dbSettings.name,
        dbSettings.user,
        dbSettings.password,
        dbSettings.options,
    )
    const providers: Providers<CREATORS> = {} as Providers<CREATORS>;
    const models: Models<CREATORS> = {} as Models<CREATORS>;
    for (const key of Object.keys(creators)) {
        const creator = verify(creators[key as keyof CREATORS])
        const model = creator.model(sequelize)
        models[key as keyof CREATORS] = model
        providers[key as keyof CREATORS] = creator.provider(model)
    }
    bindRelationships(models)

    return sequelize.sync({ force: true }).then(() => providers)
}

export type SequelizeDataProvider<INIT_FN extends (() => Promise<unknown>)> = ReturnType<INIT_FN> extends PromiseLike<infer U>
    ? U
    : never
