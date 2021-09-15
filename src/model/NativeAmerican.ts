import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

class NativeAmerican extends Model {
    public id!: string;
    public addressVert!: number;
    public addressHoriz!: number;
    public activity!: number;
    public clanId!: number;
}

type NativeAmericanStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): NativeAmerican;
}

export function initNativeAmericanProvider(sequelize: Sequelize) {
    const nativeAmericanProvider = <NativeAmericanStatic>sequelize.define("native_american", {
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
        activity: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        clanId: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    })
    return {
        get(nativeAmericanId: string) {
            return nativeAmericanProvider.findByPk(nativeAmericanId)
        }
    }
}
