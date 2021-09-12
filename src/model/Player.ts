import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"
import {Team} from "../constants/Team"

class Player extends Model {
    public id!: string;
    public name!: string;
    public team!: number;
    public gameId!: string;
}

type PlayerStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): Player
}

export function initPlayerProvider(sequelize: Sequelize) {
    const playerProvider = <PlayerStatic>sequelize.define("Player", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        team: {
            type: DataTypes.INTEGER,
            field: "team_id"
        },
        gameId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Game",
                key: "id"
            },
            onDelete: "cascade",
            field: "game_id"
        }
    }, 
    {
        indexes: [
            {
                unique: true,
                fields: ["team_id", "game_id"]
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
                name: "Game Technician",
                team: Team.GAME_TECHNICIAN,
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
        getPlayerByGameIdAndteam(gameId: string, teamId: number) {
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
                },
                order: ["updatedAt"]
            })
        },
        updateTeamById(teamId: number | null, id: string) {
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
