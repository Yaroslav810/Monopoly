import {Team} from "../constants/Team"
import {Role} from "../constants/Role"
import {Player} from "./entities/Player"
import {Politician} from "./entities/Politician"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"
import {TempPlayerRepository} from "../infrastructure/repositories/tempPlayerRepository"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {TimerRepository} from "../infrastructure/repositories/timerRepository"
import {initPoliticianProvider} from "./Politician"
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

export function initPlayerProvider(
    playerRepository: PlayerRepository,
    _: TempPlayerRepository,
    __: GameRepository,
    ___: TimerRepository
) {
    const createTeam = (player: Player) => {
        switch (player.getTeam()) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return politician.create(player.getId())
            }
            default: {
                return null
            }
        }
    }

    const deleteTeam = (player: Player) => {
        switch (player.getTeam()) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return politician.delete(player.getId())
            }
            default: {
                return null
            }
        }
    }

    const getTeam = async (player: Player) => {
        switch (player.getTeam()) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return politician.getByPlayerId(player.getId())
            }
            default: {
                return null
            }
        }
    }

    const addRevenueToPlayer = async (player: Player) => {
        const teamInfo = await getTeamInfo(player.getId())
        if (!teamInfo) {
            return
        }
        switch (teamInfo.type) {
            case Role.POLICIES: {
                await politician.addBudgetUnits(teamInfo.data.getId(), 15)
            }
        }
    }

    const getTeamInfo = async (playerId: string): Promise<TeamInfo> => {
        const player = await playerRepository.getPlayerById(playerId)
        if (!player || !player.getTeam()) {
            return null
        }
        switch (player.getTeam()) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                const politicianPlayer = await politician.getByPlayerId(player.getId())
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

    const politician = initPoliticianProvider(playerRepository)

    return {
        create(player: {name: string, gameId: string, team: number | null}): Promise<Player> {
            return playerRepository.createPlayer(player)
        },

        createGameTechnician(gameId: string): Promise<Player> {
            return playerRepository.createPlayer({
                name: "Game Technician",
                gameId: gameId,
                team: Team.GAME_TECHNICIAN
            })
        },

        getPlayerById(playerId: string): Promise<Player | null> {
            return playerRepository.getPlayerById(playerId)
        },

        getPlayerByGameIdAndTeam(gameId: string, team: Team): Promise<Player | null> {
            return playerRepository.getPlayerByGameIdAndTeam(gameId, team)
        },

        getPlayersByGameId(gameId: string): Promise<Player[]> {
            return playerRepository.getPlayersByGameId(gameId)
        },

        async setTeam(team: Team, playerId: string): Promise<void> {
            const player = await playerRepository.getPlayerById(playerId)
            if (!player) {
                return
            }

            if (player.getTeam() !== null) {
                await deleteTeam(player)
            }

            player.setTeam(team)
            await Promise.all([
                playerRepository.setTeamById(team, player.getId()),
                createTeam(player)
            ])
        },

        async deleteTeam(playerId: string): Promise<void> {
            const player = await playerRepository.getPlayerById(playerId)
            if (!player) {
                return
            }

            await Promise.all([
                deleteTeam(player),
                playerRepository.setTeamById(null, playerId)
            ])
        },

        async getInfoAboutTeams(gameId: string): Promise<RoleStateHolder[]> {
            const players = await this.getPlayersByGameId(gameId)

            const teamsInfo = []
            for (const player of players) {
                teamsInfo.push(getTeam(player))
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
                teamsInfo.push(addRevenueToPlayer(player))
            }
            await Promise.all(teamsInfo)
        }
    }
}
