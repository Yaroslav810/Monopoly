import {Game} from "./entities/Game"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {TimerRepository} from "../infrastructure/repositories/timerRepository"
import {GameStatus} from "../infrastructure/configurations/Game"
import {IOrderProvider} from "./Orders"

export enum StepStatus {
    ORDERS = "orders",
    EXECUTION = "execution"
}

type CurrentPhase = null | {
    stateGame: GameStatus.PREPARATION
} | {
    stateGame: GameStatus.ACTIVE,
    step: StepStatus.ORDERS,
    currentMove: number,
    remainingTimeInMs: number,
    orderProvider: IOrderProvider
} | {
    stateGame: GameStatus.ACTIVE,
    step: StepStatus.EXECUTION,
    currentMove: number
} | {
    stateGame: GameStatus.COMPLETED
    totalMoves: number
}

export function initGameProvider(
    gameRepository: GameRepository,
    timerRepository: TimerRepository,
    orderProvider: IOrderProvider
) {
    const initStepOrder = async (gameId: string) => {
        orderProvider.initOrderStorage(gameId)
        await orderProvider.saveState(gameId)
    }

    return {
        create(): Promise<Game> {
            return gameRepository.createGame()
        },

        getGameById(id: string): Promise<Game | null> {
            return gameRepository.getGameById(id)
        },

        async isGameStarted(gameId: string): Promise<boolean> {
            const game = await gameRepository.getGameById(gameId)
            return !(!game || game.getState() !== GameStatus.PREPARATION)
        },

        async isGameActive(gameId: string): Promise<boolean> {
            const game = await gameRepository.getGameById(gameId)
            return !(!game || game.getState() !== GameStatus.ACTIVE)
        },

        async currentPhase(gameId: string): Promise<CurrentPhase> {
            const game = await gameRepository.getGameById(gameId)
            if (!game) {
                return null
            }

            if (game.getState() === GameStatus.PREPARATION) {
                return {
                    stateGame: GameStatus.PREPARATION
                }
            }

            if (game.getState() === GameStatus.COMPLETED) {
                return {
                    stateGame: GameStatus.COMPLETED,
                    totalMoves: game.getCurrentMove()
                }
            }

            const timer = timerRepository.getRemainingTimeInMs(gameId)
            if (timer !== 0) {
                return {
                    stateGame: GameStatus.ACTIVE,
                    step: StepStatus.ORDERS,
                    currentMove: game.getCurrentMove(),
                    remainingTimeInMs: timer,
                    orderProvider: orderProvider
                }
            }

            return {
                stateGame: GameStatus.ACTIVE,
                step: StepStatus.EXECUTION,
                currentMove: game.getCurrentMove()
            }
        },

        async startNextPhase(gameId: string): Promise<number | null> {
            const game = await gameRepository.getGameById(gameId)
            if (!game || game.getState() !== GameStatus.ACTIVE) {
                return null
            }

            const timer = timerRepository.getRemainingTimeInMs(gameId)
            if (timer) {
                return null
            }

            game.setCurrentMove(game.getCurrentMove() + 1)
            await Promise.all([
                gameRepository.updateGame(game),
                initStepOrder(gameId)
            ])

            return timerRepository.start(gameId)
        },

        async finishPhase(gameId: string): Promise<void> {
            orderProvider.executeOrders(gameId)
            orderProvider.clearOrderStorage(gameId)
            await orderProvider.commitState(gameId)
        },

        async startGame(gameId: string): Promise<Game | null> {
            const game = await gameRepository.getGameById(gameId)
            if (!game) {
                return null
            }

            game.setState(GameStatus.ACTIVE)
            await gameRepository.updateGame(game)

            return game
        }
    }
}
