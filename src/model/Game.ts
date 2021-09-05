import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class Game extends Model {
    public id!: string;
}

type GameStatic = typeof Game & {
    new(values?: object, options?: BuildOptions): Game
}

export const GameCreator = {
    model: (sequelize: Sequelize) => <GameStatic>sequelize.define('Game', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        }
    }, {
        freezeTableName: true,
        createdAt: 'creationDate'
    }),
    provider: (model: GameStatic) => ({
        create() {
            return model.create({
                id: generateUUId()
            })
        },
        getGameById(id: string) {
            return model.findOne({
                where: {
                    id: id
                }
            })
        }
    })
}