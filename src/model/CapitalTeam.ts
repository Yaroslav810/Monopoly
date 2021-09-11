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

export function initCapitalTeamProvider(sequelize: Sequelize) {
    const CapitalTeamProvider = <CapitalTeamStatic>sequelize.define('capital_team', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        cityId: {
            type: DataTypes.STRING(32),
            allowNull: false,
            references: {
                model: 'city',
                key: 'city_id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        },
        teamId: {
            type: DataTypes.TINYINT,
            allowNull: false,
            references: {
                model: 'city',
                key: 'team_id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }
    });
    return {
        get(CapitalTeamID: string) {
            return CapitalTeamProvider.findByPk(CapitalTeamID)
        }
    }
}