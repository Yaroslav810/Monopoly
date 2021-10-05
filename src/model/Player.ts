import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"
import {Team} from "../constants/Team"
import {initPoliticianProvider, Politician} from "./Politician"
import {Role} from "../constants/Role"

export type PlayerRole = Politician

type TeamInfo = null | {
    type: Role
    data: PlayerRole
}

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
            type: DataTypes.TINYINT,
            field: "team"
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
                fields: ["team", "game_id"]
            }
        ],
        underscored: true
    })



    const createTeam = (player: Player) => {
        switch (player.team) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return politician.create(player.id)
            }
            default: {
                return null
            }
        }
    }

    const deleteTeam = (player: Player) => {
        switch (player.team) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return politician.delete(player.id)
            }
            default: {
                return null
            }
        }
    }

    const updateTeamById = async (team: number | null, id: string) => {
        await playerProvider.update({
            team: team
        }, {
            where: {
                id: id
            }
        })

        return playerProvider.findByPk(id)
    }

    const politician = initPoliticianProvider(sequelize)

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
                name: "Game Technician",
                team: Team.GAME_TECHNICIAN,
                gameId: gameId
            })
        },
        getPlayerById(id: string) {
            return playerProvider.findByPk(id)
        },
        getPlayerByGameIdAndTeam(gameId: string, team: number) {
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
                },
                order: ["updatedAt"]
            })
        },
        async getTeamInfo(playerId: string): Promise<TeamInfo> {
            const player = await playerProvider.findByPk(playerId)
            if (!player || !player.team) {
                return null
            }
            switch (player.team) {
                case Team.FEDERATION:
                case Team.CONFEDERATION:
                case Team.REPUBLIC: {
                    const politicianPlayer = await politician.getByPlayerId(player.id)
                    if (!politicianPlayer) {
                        return null
                    }
                    return {
                        type: Role.POLICIES,
                        data: politicianPlayer as Politician
                    }
                }
            }

            return null
        },
        async reserveTeam(team: number | null, playerId: string) {
            let player = await playerProvider.findByPk(playerId)
            if (!player) {
                return
            }
            if (player.team) {
                await deleteTeam(player)
            }
            player = await updateTeamById(team, player.id) as Player
            await createTeam(player)
        },
        async releaseTeam(playerId: string) {
            const player = await playerProvider.findByPk(playerId)
            if (!player) {
                return
            }
            if (player.team) {
                await deleteTeam(player)
            }
            await updateTeamById(null, playerId)
        },
        async getInfoAllPlayers(gameId: string) {
            const players = await this.getPlayersByGameId(gameId)

            const detailInfoPlayers: Array<PlayerRole> = []
            for (const player of players) {
                const teamInfo = await this.getTeamInfo(player.id)
                if (!teamInfo) {
                    continue
                }
                teamInfo.data.prepareToOrdersStep()
                detailInfoPlayers.push(teamInfo.data)
            }

            return detailInfoPlayers
        },
        completionOrdersStep(players: PlayerRole[]) {
            players.forEach(async player => {
                const teamInfo = await this.getTeamInfo(player.getId())
                if (!teamInfo) {
                    return
                }
                switch (teamInfo.type) {
                    case Role.POLICIES: {
                        await Promise.all([politician.update(player), politician.finishToOrderStep(player.getId())])
                    }
                }
            })
        }
    }
}
