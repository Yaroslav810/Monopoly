import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class City extends Model {
    public id!: number;
    public name!: string;
    public addressVert!: number;
    public addressHoriz!: number;
    public roleId!: number;
}

type CityStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): City;
}

export function initCityProvider(sequelize: Sequelize) {
    const CityProvider = <CityStatic>sequelize.define('city', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
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
        teamId: {
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