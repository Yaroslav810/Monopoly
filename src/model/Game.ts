import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

export enum GameStatus {
    PREPARATION = "preparation",
    ACTIVE = "active",
    COMPLETED = "completed"
}

class Game extends Model {
    public id!: string
    public state!: GameStatus
    public currentMove!: number
}

type GameStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): Game
}

export function initGameProvider(sequelize: Sequelize) {
    const gameProvider = <GameStatic>sequelize.define("Game", {
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

    return {
        create(): Promise<Game> {
            return gameProvider.create({
                id: generateUUId(),
                state: GameStatus.PREPARATION,
                currentMove: 1
            })
        },
        getGameById(id: string): Promise<Game | null> {
            return gameProvider.findByPk(id)
        },
        changeState(id: string, state: GameStatus) {
            return gameProvider.update({
                state: state
            }, {
                where: {
                    id: id
                }
            })
        },
        async incrementMove(id: string): Promise<Game | null> {
            const game = await gameProvider.findByPk(id)
            if (!game) {
                return null
            }

            return game.increment("currentMove")
        }
    }
}
