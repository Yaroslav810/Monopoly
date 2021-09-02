import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class StaticObject extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public terrain!: number;
}

type StaticObjectType = typeof Model & {
    new (values?: object, options?: BuildOptions): StaticObject;
}

export function initStaticObjectProvider(sequelize: Sequelize) {
    const StaticObjectProvider = <StaticObjectType>sequelize.define('static_object', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
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
        terrain: {
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