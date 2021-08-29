import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class NativeAmerican extends Model {
    public id!: string;
    public addressVert!: number;
    public addressHoriz!: number;
    public activity!: number;
    public clan!: number;
}

type NativeAmericanStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): NativeAmerican;
}

export function initNativeAmericanProvider(sequelize: Sequelize) {
    const NativeAmericanProvider = <NativeAmericanStatic>sequelize.define('native_american', {
        id: {
            type: DataTypes.STRING(36),
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
        activity: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        clan: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    });
    return {
        get(NativeAmericanID: string) {
            return NativeAmericanProvider.findByPk(NativeAmericanID)
        }
    }
}