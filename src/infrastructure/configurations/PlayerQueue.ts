import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

class PlayerQueueModel extends Model {
    public id!: string
    public playerId!: string
    public numberInQueue!: number
}

type PlayerQueueStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PlayerQueueModel
}

export type {PlayerQueueModel}

export function initPlayerQueueConfiguration(sequelize: Sequelize) {
    return <PlayerQueueStatic>sequelize.define("player_queue", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "player",
                key: "id"
            },
            onDelete: "cascade",
            field: "player_id"
        },
        numberInQueue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "number_in_queue"
        }
    })
}
