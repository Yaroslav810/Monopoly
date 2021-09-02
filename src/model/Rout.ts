import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class Rout extends Model {
    public id!: number;
    public city1!: number;
    public city2!: number;
    public railwayCompany!: number;
    public cost!: number;
}

type RoutStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Rout;
}

export function initRoutProvider(sequelize: Sequelize) {
    const RoutProvider = <RoutStatic>sequelize.define('rout', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        city1: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        city2: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        railwayCompany: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        cost: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    });
    return {
        get(RoutID: string) {
            return RoutProvider.findByPk(RoutID)
        }
    }
}