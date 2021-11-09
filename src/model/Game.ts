import {Game} from "./entities/Game"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {TimerRepository} from "../infrastructure/repositories/timerRepository"

export function initGameProvider(
    gameRepository: GameRepository,
    _: TimerRepository
) {
    return {
        create(): Promise<Game> {
            return gameRepository.createGame()
        },

        getGameById(id: string): Promise<Game | null> {
            return gameRepository.getGameById(id)
        }
    }
}
