import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { generateUUId } from "../../core/utils/UUIDUtils";

class Team extends Model {
    public id!: number;
    public uuid!: string;
    public teamConstant!: number;
}

type TeamStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Team;
}

export function initTeamProvider(sequelize: Sequelize) {
    const teamProvider = <TeamStatic>sequelize.define('Team', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        uuid: {
            type: DataTypes.UUID,
            unique: true,
            allowNull: false
        },
        teamConstant: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true
    })

    return {
        create(teamId: number) {
            return teamProvider.create({
                uuid: generateUUId(),
                teamConstant: teamId
            })
        },
        getTeamByCode(teamId: number) {
            return teamProvider.findOne({
                where: {
                    teamConstant: teamId
                }
            })
        }
    }
}
