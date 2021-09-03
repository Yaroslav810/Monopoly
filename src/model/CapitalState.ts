import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class CapitalState extends Model {
    public id!: number;
    public cityId!: number;
    public roleId!: number;
}

type CapitalStateStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CapitalState;
}

export function initCapitalStateProvider(sequelize: Sequelize) {
    const CapitalStateProvider = <CapitalStateStatic>sequelize.define('capital_state', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        cityId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        roleId: {
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