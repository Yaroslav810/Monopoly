import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

export enum GameStatus {
    RECRUITMENT_OF_PLAYERS = "recruitmentOfPlayers",
    PREPARATION = "preparation",
    ACTIVE = "active",
    GAME_OVER = "gameOver"
}

class GameModel extends Model {
    public id!: string
    public numberPlayers!: number
    public state!: GameStatus
}

type GameStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): GameModel
}

export type {GameModel}

export function initGameConfiguration(sequelize: Sequelize) {
    return <GameStatic>sequelize.define("game", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        numberPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "number_players"
        },
        state: {
            type: DataTypes.ENUM(
                GameStatus.RECRUITMENT_OF_PLAYERS,
                GameStatus.PREPARATION,
                GameStatus.ACTIVE,
                GameStatus.GAME_OVER
            ),
            allowNull: false
        }
    })
}
