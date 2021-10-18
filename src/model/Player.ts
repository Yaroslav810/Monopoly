import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"
import {Team} from "../constants/Team"
import {initPoliticianProvider, Politician} from "./Politician"
import {Role} from "../constants/Role"
import {notEmpty} from "../../core/utils/typeutils"

export type RoleStateHolder = Politician

type TeamInfo = null | {
    type: Role.POLICIES
    data: Politician
} | {
    type: Role.RAILWAYS
    data: Politician
} | {
    type: Role.TRADING_COMPANIES
    data: Politician
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

    const _addRevenueToPlayer = async (player: Player) => {
        const teamInfo = await _getTeamInfo(player.id)
        if (!teamInfo) {
            return
        }
        switch (teamInfo.type) {
            case Role.POLICIES: {
                await politician.addBudgetUnits(teamInfo.data.getId(), 15)
            }
        }
    }

    const _getTeamInfo = async (playerId: string): Promise<TeamInfo> => {
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
    }

    const _getTeam = async (player: Player) => {
        switch (player.team) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return politician.getByPlayerId(player.id)
            }
            default: {
                return null
            }
        }
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
        async setTeam(team: number | null, playerId: string) {
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
        async deleteTeam(playerId: string) {
            const player = await playerProvider.findByPk(playerId)
            if (!player) {
                return
            }
            if (player.team) {
                await deleteTeam(player)
            }
            await updateTeamById(null, playerId)
        },
        async getInfoAllPlayers(gameId: string): Promise<RoleStateHolder[]> {
            const players = await this.getPlayersByGameId(gameId)

            const teamsInfo = []
            for (const player of players) {
                teamsInfo.push(_getTeam(player))
            }

            return (await Promise.all(teamsInfo)).filter(notEmpty)
        },
        prepareData(players: RoleStateHolder[]) {
            players.forEach(player => {
                player.prepareData()
            })
        },
        async commitState(players: RoleStateHolder[]) {
            const updatePlayers = []
            for (const player of players) {
                if (politician.isPolitician(player)) {
                    updatePlayers.push(politician.update(player))
                }
            }
            await Promise.all(updatePlayers)
        },
        async addRevenueToPlayers(gameId: string) {
            const players = await this.getPlayersByGameId(gameId)

            const teamsInfo = []
            for (const player of players) {
                teamsInfo.push(_addRevenueToPlayer(player))
            }
            await Promise.all(teamsInfo)
        }
    }
}
