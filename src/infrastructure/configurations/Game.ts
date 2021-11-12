import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

export enum GameStatus {
    PREPARATION = "preparation",
    ACTIVE = "active",
    COMPLETED = "completed"
}

class GameModel extends Model {
    public id!: string
    public state!: GameStatus
    public currentMove!: number
}

type GameStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): GameModel
}

export type {GameModel}

export function initGameConfiguration(sequelize: Sequelize) {
    return <GameStatic>sequelize.define("Game", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM(
                GameStatus.PREPARATION,
                GameStatus.ACTIVE,
                GameStatus.COMPLETED
            ),
            allowNull: false
        },
        currentMove: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "current_move"
        }
    },
    {
        createdAt: "creationDate"
    })
}
