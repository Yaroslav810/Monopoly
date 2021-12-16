import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

class ChanceQueueModel extends Model {
    public id!: string
    public gameId!: string
    public chanceCardId!: number
    public numberInQueue!: number
}

type ChanceQueueStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): ChanceQueueModel
}

export type {ChanceQueueModel}

export function initChanceQueueConfiguration(sequelize: Sequelize) {
    return <ChanceQueueStatic>sequelize.define("chance_queue", {
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
        chanceCardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "chance_card_id"
        },
        numberInQueue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "number_in_queue"
        }
    })
}
