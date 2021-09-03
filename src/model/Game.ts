import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { generateUUId } from "../../core/utils/UUIDUtils";

class Game extends Model {
    public id!: number;
    public uuid!: string;
}

type GameStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Game
}

export function intiGameProvider(sequelize: Sequelize) {
    const gameProvider = <GameStatic>sequelize.define('game', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false
        },
        uuid: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false
        }
    })

    return {
        create() {
            return gameProvider.create({
                uuid: generateUUId()
            })
        }
    }
}
