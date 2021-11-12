import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class StaticObjectModel extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public terrainId!: number;
}

type StaticObjectType = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): StaticObjectModel;
}

export function initStaticObjectConfiguration(sequelize: Sequelize) {
    return <StaticObjectType>sequelize.define("static_object", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        addressVert: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        addressHoriz: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        terrainId: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    })
}
