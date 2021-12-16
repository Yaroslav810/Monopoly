import {Game} from "./entities/Game"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {GameStatus} from "../infrastructure/configurations/Game"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"

export interface GameProvider {
    create(numberPlayers: number): Promise<Game>
    getGameById(id: string): Promise<Game | null>
}

interface AvailableGame {
    gameToken: string,
    numberPlayers: number,
    players: {
        name: string,
        playerToken: string
    }[]
}

export function initGameProvider(
    gameRepository: GameRepository,
    playerRepository: PlayerRepository
) {
    return new class implements GameProvider {
        create(numberPlayers: number): Promise<Game> {
            return gameRepository.createGame(numberPlayers)
        }

        getGameById(id: string): Promise<Game | null> {
            return gameRepository.getGameById(id)
        }

        async getAvailableGames(): Promise<AvailableGame[]> {
            const games = await gameRepository.getGamesByState(GameStatus.RECRUITMENT_OF_PLAYERS)
            const players = []
            for (const game of games) {
                players.push({
                    gameToken: game.getId(),
                    numberPlayers: game.getNumberPlayers(),
                    players: (await playerRepository.getPlayersByGameId(game.getId()))
                        .map(player => ({
                            name: player.getName(),
                            playerToken: player.getId()
                        }))
                })
            }

            return players
        }
    }
}
