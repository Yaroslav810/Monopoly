import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

class PublicTreasureQueueModel extends Model {
    public id!: string
    public gameId!: string
    public publicTreasureCardId!: number
    public numberInQueue!: number
}

type PublicTreasureQueueStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PublicTreasureQueueModel
}

export type {PublicTreasureQueueModel}

export function initPublicTreasureQueueConfiguration(sequelize: Sequelize) {
    return <PublicTreasureQueueStatic>sequelize.define("public_treasure_queue", {
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
        publicTreasureCardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "public_treasure_card_id"
        },
        numberInQueue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "number_in_queue"
        }
    })
}
