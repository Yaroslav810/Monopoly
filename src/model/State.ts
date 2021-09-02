import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class State extends Model {
    public id!: number;
    public name!: string;
    public logo!: string;
}

type StateStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): State;
}

export function initStateProvider(sequelize: Sequelize) {
    const StateProvider = <StateStatic>sequelize.define('state', {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return {
        get(StateID: string) {
            return StateProvider.findByPk(StateID)
        }
    }
}