import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

class Game extends Model {
    public id!: string;
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
        }
    }, 
    {
        createdAt: "creationDate"
    })

    return {
        create() {
            return gameProvider.create({
                id: generateUUId()
            })
        },
        getGameById(id: string) {
            return gameProvider.findByPk(id)
        }
    }
}
