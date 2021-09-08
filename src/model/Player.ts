import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { generateUUId } from "../../core/utils/UUIDUtils";
import { TeamId } from "../constants/Team";

class Player extends Model {
    public id!: string;
    public name!: string;
    public teamId!: number;
    public gameId!: string;
}

type PlayerStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Player
}

export function initPlayerProvider(sequelize: Sequelize) {
    const playerProvider = <PlayerStatic>sequelize.define('Player', {
        id: {
            type: DataTypes.STRING(32),
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
        gameId: {
            type: DataTypes.STRING(32),
            allowNull: false,
            references: {
                model: 'Game',
                key: 'id'
            },
            onDelete: "cascade",
            field: 'game_id'
        }
    }, 
    {
        indexes: [
            {
                unique: true,
                fields: ['team_id', 'game_id']
            }
        ],
        underscored: true
    })

    return {
        create(player: {name: string, gameId: string, teamId: number | null}) {
            return playerProvider.create({
                id: generateUUId(),
                name: player.name,
                teamId: player.teamId,
                gameId: player.gameId
            })
        },
        createGameTechnician(gameId: string) {
            return playerProvider.create({
                id: generateUUId(),
                name: 'Game Technician',
                teamId: TeamId.GAME_TECHNICIAN,
                gameId: gameId
            })
        },
        getPlayerById(id: string) {
            return playerProvider.findOne({
                where: {
                    id: id
                }
            })
        },
        getPlayerByGameIdAndTeamId(gameId: string, teamId: number) {
            return playerProvider.findOne({
                where: {
                    gameId: gameId,
                    teamId: teamId
                }
            })
        },
        getPlayersByGameId(gameId: string) {
            return playerProvider.findAll({
                where: {
                    gameId: gameId
                }
            })
        },
        getGameTechnicianById(playerId: string) {
            return playerProvider.findOne({
                where: {
                    id: playerId,
                    teamId: TeamId.GAME_TECHNICIAN
                }
            })
        },
        updateTeamIdById(teamId: number, id: string) {
            return playerProvider.update({
                teamId: teamId
            }, {
                where: {
                    id: id
                }
            })
        }
    }
}
