import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { generateUUId } from "../../core/utils/UUIDUtils";

class Player extends Model {
    public uuid!: string;
    public name!: string;
    public teamId!: number;
    public gameUuid!: string;
}

type PlayerStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Player
}

export function initPlayerProvider(sequelize: Sequelize) {
    const playerProvider = <PlayerStatic>sequelize.define('Player', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamId: {
            type: DataTypes.INTEGER,
            field: 'team_id'
        },
        gameUuid: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Game',
                key: 'Uuid'
            },
            onDelete: "cascade",
            field: 'game_uuid'
        }
    }, 
    {
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['team_id', 'game_uuid']
            }
        ],
        underscored: true
    })

    return {
        create(player: {name: string, gameUuid: string, teamId: number | null}) {
            return playerProvider.create({
                uuid: generateUUId(),
                name: player.name,
                teamId: player.teamId,
                gameUuid: player.gameUuid
            })
        },
        getPlayerByUuid(uuid: string) {
            return playerProvider.findOne({
                where: {
                    uuid: uuid
                }
            })
        },
        getPlayerByGameUuidAndTeamId(gameUuid: string, teamId: number) {
            return playerProvider.findOne({
                where: {
                    gameUuid: gameUuid,
                    teamId: teamId
                }
            })
        },
        updateTeamIdByUuid(teamId: number, uuid: string) {
            return playerProvider.update({
                teamId: teamId
            }, {
                where: {
                    uuid: uuid
                }
            })
        }
    }
}
