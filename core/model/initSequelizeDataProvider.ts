import {Model, Options, Sequelize} from "sequelize";
import {verify} from "../utils/typeutils";

type ModelCreator<MODEL extends typeof Model, PROVIDER> = {
    readonly model: (s: Sequelize) => MODEL,
    readonly provider: (m: MODEL) => PROVIDER,
}

type DBSettings = {
    name: string,
    user: string,
    password: string,
    options?: Options,
}

export function initSequelizeDataProvider<
    MODELS extends {
        [key in keyof MODELS]: typeof Model
    },
    PROVIDERS  extends {
        [key in keyof MODELS]: any
    }
    >(
    dbSettings: DBSettings,
    creators: {
        [key in keyof MODELS]: ModelCreator<MODELS[key], PROVIDERS[key]>
    },
    bindRelationships: (m: MODELS) => void,
) {
    const sequelize = new Sequelize(
        dbSettings.name,
        dbSettings.user,
        dbSettings.password,
        dbSettings.options,
    )
    const providers: PROVIDERS = {} as PROVIDERS;
    const models: MODELS = {} as MODELS;
    for (const key of Object.keys(creators)) {
        const creator = verify(creators[key as keyof MODELS])
        const model = creator.model(sequelize)
        const provider = creator.provider(model)
        models[key as keyof MODELS] = model
        providers[key as keyof MODELS] = provider
    }
    bindRelationships(models)

    return sequelize.sync({ force: true }).then(() => providers)
}

export type SequelizeDataProvider<INIT_FN extends (() => Promise<unknown>)> = ReturnType<INIT_FN> extends PromiseLike<infer U>
    ? U
    : never
