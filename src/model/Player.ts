import {Team} from "../constants/Team"
import {Player} from "./entities/Player"
import {Politician} from "./entities/Politician"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"
import {TempPlayerRepository} from "../infrastructure/repositories/tempPlayerRepository"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {TimerRepository} from "../infrastructure/repositories/timerRepository"
import {notEmpty} from "../../core/utils/typeutils"
import {GameStatus} from "../infrastructure/configurations/Game"

export type RoleStateHolder = Politician

// type TeamInfo = null | {
//     type: Role.POLICIES
//     data: Politician
// } | {
//     type: Role.RAILWAYS
//     data: Politician
// } | {
//     type: Role.TRADING_COMPANIES
//     data: Politician
// }

export function initPlayerProvider(
    playerRepository: PlayerRepository,
    tempPlayerRepository: TempPlayerRepository,
    gameRepository: GameRepository,
    timerRepository: TimerRepository
) {

    const getTeamsList = (): number[] => {
        return Object.keys(Team)
            .map(team => +team)
            .filter(team => !isNaN(team))
    }

    // Todo: Убрать!
    // const addRevenueToPlayer = async (player: Player) => {
    //     const teamInfo = await getTeamInfo(player.getId())
    //     if (!teamInfo) {
    //         return
    //     }
    //     switch (teamInfo.type) {
    //         case Role.POLICIES: {
    //             await politician.addBudgetUnits(teamInfo.data.getId(), 15)
    //         }
    //     }
    // }
    //
    // const getTeamInfo = async (playerId: string): Promise<TeamInfo> => {
    //     const player = await playerRepository.getPlayerById(playerId)
    //     if (!player || !player.getTeam()) {
    //         return null
    //     }
    //     switch (player.getTeam()) {
    //         case Team.FEDERATION:
    //         case Team.CONFEDERATION:
    //         case Team.REPUBLIC: {
    //             const politicianPlayer = await politician.getByPlayerId(player.getId())
    //             if (!politicianPlayer) {
    //                 return null
    //             }
    //             return {
    //                 type: Role.POLICIES,
    //                 data: politicianPlayer as Politician
    //             }
    //         }
    //     }
    //
    //     return null
    // }
    //
    // const politician = initPoliticianProvider(playerRepository)

    return {
        async createPlayer(gameId: string, name: string): Promise<Player | null> {
            const game = await gameRepository.getGameById(gameId)
            if (!game || game.getState() !== GameStatus.PREPARATION) {
                return null
            }

            return playerRepository.createPlayer({
                name: name,
                gameId: gameId,
                team: null
            })
        },

        async createGameTechnician(gameId: string): Promise<Player> {
            return playerRepository.createPlayer({
                name: "Game Technician",
                gameId: gameId,
                team: Team.GAME_TECHNICIAN
            })
        },

        getPlayerById(playerId: string): Promise<Player | null> {
            return playerRepository.getPlayerById(playerId)
        },

        getPlayersByGameId(gameId: string): Promise<Player[]> {
            return playerRepository.getPlayersByGameId(gameId)
        },

        async getPlayerTeamById(playerId: string): Promise<RoleStateHolder | null> {
            const player = await playerRepository.getPlayerById(playerId)
            if (!player) {
                return null
            }

            const game = await gameRepository.getGameById(player.getGameId())
            if (!game) {
                return null
            }

            const timer = timerRepository.getRemainingTimeInMs(player.getGameId())
            if (timer !== 0) {
                return tempPlayerRepository.getPlayerByGameIdAndPlayerId(player.getGameId(), player.getId())
            }

            return playerRepository.getTeam(player)
        },

        async getPlayersTeamByGameId(gameId: string): Promise<RoleStateHolder[] | null> {
            const game = await gameRepository.getGameById(gameId)
            if (!game) {
                return null
            }

            const timer = timerRepository.getRemainingTimeInMs(gameId)
            if (timer !== 0) {
                return tempPlayerRepository.getStateByGameId(gameId)
            }

            const players = await playerRepository.getPlayersByGameId(gameId)

            const teamsInfo = []
            for (const player of players) {
                teamsInfo.push(playerRepository.getTeam(player))
            }
            return (await Promise.all(teamsInfo)).filter(notEmpty)
        },


        async isTeamReserved(gameId: string, team: number): Promise<boolean> {
            const player = await playerRepository.getPlayerByGameIdAndTeam(gameId, team)
            return (player !== null)
        },

        async reserveTeam(playerId: string, team: number): Promise<void> {
            const player = await playerRepository.getPlayerById(playerId)
            if (!player) {
                return
            }

            player.setTeam(team)
            Promise.all([
                playerRepository.updatePlayer(player),
                playerRepository.createTeam(player)
            ])
        },

        async releasingTeam(playerId: string): Promise<void> {
            const player = await playerRepository.getPlayerById(playerId)
            if (!player) {
                return
            }

            Promise.all([
                playerRepository.deleteTeam(player),
                (async () => {
                    player.setTeam(null)
                    return playerRepository.updatePlayer(player)
                })()
            ])
        },

        async getFreeTeams(gameId: string): Promise<number[]> {
            const players = await this.getPlayersByGameId(gameId)

            const busyTeams: Array<number> = []
            players.forEach(player => {
                const team = player.getTeam()
                if (team !== null) {
                    busyTeams.push(team)
                }
            })

            return getTeamsList()
                .filter(team => !~busyTeams.indexOf(team))
        },

        async getBusyTeams(gameId: string): Promise<{team: number, name: string}[]> {
            const players = await this.getPlayersByGameId(gameId)

            const occupiedTeams: Array<{team: number, name: string}> = []
            players
                .filter(player => player.getTeam())
                .forEach(player => {
                    occupiedTeams.push({
                        team: player.getTeam() as number,
                        name: player.getName()
                    })
                })

            return occupiedTeams
        },

        async getPlayersTeamTokens(gameId: string): Promise<Map<number, string>> {
            const players = await this.getPlayersByGameId(gameId)

            const playersMap = new Map<number, string>()
            players.forEach(player => {
                const team = player.getTeam()
                team !== null && playersMap.set(team, player.getId())
            })

            return playersMap
        }
    }
}
