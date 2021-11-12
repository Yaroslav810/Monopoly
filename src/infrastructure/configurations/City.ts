import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../../core/utils/UUIDUtils";

class CityModel extends Model {
    public id!: number
    public name!: string
    public addressVert!: number
    public addressHoriz!: number
    public team!: number
}

type CityStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): CityModel
}

export function initCityConfiguration(sequelize: Sequelize) {
    return <CityStatic>sequelize.define("city", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        addressVert: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        addressHoriz: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        team: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    })
}
