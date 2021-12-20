import {Player} from "../infrastructure/repositories/mappers/entities/Player"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {GameStatus} from "../infrastructure/configurations/Game"

interface IPlayerProvider {
    createPlayer(gameId: string, name: string): Promise<Player | null>
    removePlayer(playerId: string): Promise<void>
    getPlayerById(playerId: string): Promise<Player | null>
    getPlayersByGameId(gameId: string): Promise<Player[]>
}

export function initPlayerProvider(
    playerRepository: PlayerRepository,
    gameRepository: GameRepository
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
    }
}
