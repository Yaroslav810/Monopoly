import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class City extends Model {
    public id!: number;
    public name!: string;
    public addressVert!: number;
    public addressHoriz!: number;
    public state!: number;
}

type CityStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): City;
}

export function initCityProvider(sequelize: Sequelize) {
    const CityProvider = <CityStatic>sequelize.define('city', {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        addressVert: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        addressHoriz: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        state: {
            type: DataTypes.TINYINT,
            allowNull: true,
        }
    });
    return {
        get(CityID: string) {
            return CityProvider.findByPk(CityID)
        }
    }
}