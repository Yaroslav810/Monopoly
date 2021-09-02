import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class CapitalState extends Model {
    public id!: number;
    public city!: number;
    public state!: number;
}

type CapitalStateStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CapitalState;
}

export function initCapitalStateProvider(sequelize: Sequelize) {
    const CapitalStateProvider = <CapitalStateStatic>sequelize.define('capital_state', {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        city: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        state: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    });
    return {
        get(CapitalStateID: string) {
            return CapitalStateProvider.findByPk(CapitalStateID)
        }
    }
}