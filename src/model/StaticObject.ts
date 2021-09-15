import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class StaticObject extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public terrainId!: number;
}

type StaticObjectType = typeof Model & {
    new (values?: object, options?: BuildOptions): StaticObject;
}

export function initStaticObjectProvider(sequelize: Sequelize) {
    const StaticObjectProvider = <StaticObjectType>sequelize.define('static_object', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        addressVert: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        addressHoriz: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        terrainId: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    });
    return {
        get(StaticObjectID: string) {
            return StaticObjectProvider.findByPk(StaticObjectID)
        }
    }
}