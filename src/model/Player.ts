import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { generateUUId } from "../../core/utils/UUIDUtils";
import { Team } from "../constants/Team";

class Player extends Model {
    public id!: string;
    public name!: string;
    public team!: number;
    public gameId!: string;
}

type PlayerStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Player
}

export function initPlayerProvider(sequelize: Sequelize) {
    const playerProvider = <PlayerStatic>sequelize.define('Player', {
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
            field: 'team_id'
        },
        gameId: {
            type: DataTypes.UUID,
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
        create(player: {name: string, gameId: string, team: number | null}) {
            return playerProvider.create({
                id: generateUUId(),
                name: player.name,
                team: player.team,
                gameId: player.gameId
            })
        },
        createGameTechnician(gameId: string) {
            return playerProvider.create({
                id: generateUUId(),
                name: 'Game Technician',
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
        getPlayerByGameIdAndTeamId(gameId: string, team: number) {
            return playerProvider.findOne({
                where: {
                    gameId: gameId,
                    team: team
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
        updateTeamIdById(team: number, id: string) {
            return playerProvider.update({
                team: team
            }, {
                where: {
                    id: id
                }
            })
        }
    }
}
