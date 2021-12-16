import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

export enum ActionType {
    MOTION = "motion",
    CONTRACT = "contract",
    PROPERTY = "property",
    DEVELOPMENT = "development",
    CHANCE = "chance",
    PUBLIC_TREASURE = "publicTreasure",
    PAYMENT = "payment",
    SUPPLEMENT = "supplement"
}

class ActionModel extends Model {
    public id!: string
    public gameId!: string
    public numberInQueue!: number
    public type!: ActionType
    public actionId!: string
}

type ActionStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): ActionModel
}

export type {ActionModel}

export function initActionConfiguration(sequelize: Sequelize) {
    return <ActionStatic>sequelize.define("action", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        gameId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "game",
                key: "id"
            },
            onDelete: "cascade",
            field: "game_id"
        },
        numberInQueue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "number_in_queue"
        },
        type: {
            type: DataTypes.ENUM(
                ActionType.MOTION,
                ActionType.CONTRACT,
                ActionType.PROPERTY,
                ActionType.DEVELOPMENT,
                ActionType.CHANCE,
                ActionType.PUBLIC_TREASURE,
                ActionType.PAYMENT,
                ActionType.SUPPLEMENT
            ),
            allowNull: false
        },
        actionId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: "action_id"
        }
    })
}
