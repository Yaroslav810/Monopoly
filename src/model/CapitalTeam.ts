import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class CapitalTeam extends Model {
    public id!: number;
    public cityId!: number;
    public roleId!: number;
}

type CapitalTeamStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CapitalTeam;
}

export function initCapitalStateProvider(sequelize: Sequelize) {
    const CapitalTeamProvider = <CapitalTeamStatic>sequelize.define('capital_team', {
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
        get(CapitalTeamID: string) {
            return CapitalTeamProvider.findByPk(CapitalTeamID)
        }
    }
}