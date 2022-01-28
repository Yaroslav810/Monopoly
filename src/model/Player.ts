import {Player} from "../infrastructure/repositories/mappers/entities/Player"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {GameStatus} from "../infrastructure/configurations/Game"
import {PlayerStateRepository} from "../infrastructure/repositories/playerStateRepository"
import {PlayerStateStatus} from "../infrastructure/configurations/PlayerState"
import {PlayerQueueRepository} from "../infrastructure/repositories/playerQueueRepository"
import {notEmpty} from "../../core/utils/typeutils"

interface IPlayerProvider {
    createPlayer(gameId: string, name: string): Promise<Player | null>
    removePlayer(playerId: string): Promise<void>
    getPlayerById(playerId: string): Promise<Player | null>
    getPlayersByGameId(gameId: string): Promise<Player[]>
}

interface PlayerState {
    name: string,
    amountMoney: number,
    positionOnMap: number | null,
    state: PlayerStateStatus
}

export function initPlayerProvider(
    playerRepository: PlayerRepository,
    gameRepository: GameRepository,
    playerStateRepository: PlayerStateRepository,
    playerQueueRepository: PlayerQueueRepository
) {
    return new class PlayerProvider implements IPlayerProvider {
        async createPlayer(gameId: string, name: string): Promise<Player | null> {
            const game = await gameRepository.getGameById(gameId)
            if (!game || game.getState() !== GameStatus.RECRUITMENT_OF_PLAYERS) {
                return null
            }

            return playerRepository.createPlayer({
                name: name,
                gameId: gameId
            })
        }

        async removePlayer(playerId: string): Promise<void> {
            await playerRepository.deletePlayer(playerId)
        }

        getPlayerById(playerId: string): Promise<Player | null> {
            return playerRepository.getPlayerById(playerId)
        }

        getPlayersByGameId(gameId: string): Promise<Player[]> {
            return playerRepository.getPlayersByGameId(gameId)
        }

        async getPlayersStateByGameId(gameId: string): Promise<(PlayerState)[]> {
            const players = await this.getPlayersByGameId(gameId)

            return (await Promise.all(players.map(async player => {
                try {
                    const state = await playerStateRepository.getPlayerStateByPlayerId(player.getId())
                    if (!state) {
                        return null
                    }

                    return {
                        name: player.getName(),
                        amountMoney: state.getAmountMoney(),
                        positionOnMap: state.getPositionOnMap(),
                        state: state.getState()
                    }
                } catch (e) {
                    return null
                }
            }))).filter(notEmpty)
        }

        async getPlayersQueueByGameId(gameId: string): Promise<string[]> {
            const players = await this.getPlayersByGameId(gameId)

            return (await Promise.all(players.map(async player => {
                try {
                    const queue = await playerQueueRepository.getPlayerQueueByPlayerId(player.getId())
                    if (!queue) {
                        return null
                    }

                    return {
                        name: player.getName(),
                        numberInQueue: queue.getNumberInQueue()
                    }
                } catch (e) {
                    return null
                }
            }))).filter(notEmpty).sort((a, b) => a.numberInQueue - b.numberInQueue)
                .map(pl => pl.name)
        }
    }
}
