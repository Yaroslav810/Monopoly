import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

class GameStateModel extends Model {
    public id!: string
    public gameId!: string
    public currentPlayer!: string
    public chanceQueueId!: string
    public publicTreasureQueue!: string
}

type GameStateStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): GameStateModel
}

export type {GameStateModel}

export function initGameStateConfiguration(sequelize: Sequelize) {
    return <GameStateStatic>sequelize.define("game_state", {
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
        currentPlayer: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "player",
                key: "id"
            },
            onDelete: "cascade",
            field: "current_player"
        },
        chanceQueueId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "chance_queue",
                key: "id"
            },
            onDelete: "cascade",
            field: "chance_queue_id"
        },
        publicTreasureQueue: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "public_treasure_queue",
                key: "id"
            },
            onDelete: "cascade",
            field: "public_treasure_queue"
        }
    })
}
