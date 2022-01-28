import {Game} from "../infrastructure/repositories/mappers/entities/Game"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {GameStatus} from "../infrastructure/configurations/Game"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"
import {IEventBindingProvider} from "./EventBinding"
import {Awaiting} from "./awaiting/Awaiting"
import {StartGameAwaitingPlayerState} from "./awaiting/StartGameAwaiting"
import {IBankProvider} from "./Bank"
import {Logger} from "../../core/Logger"
import {PlayerQueueRepository} from "../infrastructure/repositories/playerQueueRepository"
import {getRandomOrder} from "../common/utils"
import {Player} from "../infrastructure/repositories/mappers/entities/Player"
import {ChanceCardType, GameData, PublicTreasureCardType} from "../constants/Game/GameData"
import {ChanceQueueRepository} from "../infrastructure/repositories/chanceQueueRepository"
import {PublicTreasureQueueRepository} from "../infrastructure/repositories/publicTreasureQueueRepository"
import {PlayerStateRepository} from "../infrastructure/repositories/playerStateRepository"
import {PlayerStateStatus} from "../infrastructure/configurations/PlayerState"

interface AvailableGame {
    gameToken: string,
    numberPlayers: number,
    players: {
        name: string,
        playerToken: string
    }[]
}

interface IGameProvider {
    create(numberPlayers: number): Promise<Game>
    getGameById(id: string): Promise<Game | null>
    getAvailableGames(): Promise<AvailableGame[]>
    startGameEvent(gameId: string, playerId: string): Promise<void>
    startGame(gameId: string): void
    addPlayer(gameId: string, playerId: string): void
    removePlayer(gameId: string, playerId: string): void
    onPrepareGame(gameId: string): Promise<void>
}

export function initGameProvider(
    gameRepository: GameRepository,
    playerRepository: PlayerRepository,
    awaiting: Awaiting,
    playerQueueRepository: PlayerQueueRepository,
    chanceQueueRepository: ChanceQueueRepository,
    publicTreasureQueueRepository: PublicTreasureQueueRepository,
    playerStateRepository: PlayerStateRepository,
    awaitingProvider: IEventBindingProvider,
    _: IBankProvider
) {
    return new class GameProvider implements IGameProvider {
        async create(numberPlayers: number): Promise<Game> {
            const game = await gameRepository.createGame(numberPlayers)
            awaiting.startGameAwaiting.initGameAwaiting(game.getId())
            return game
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

        async startGameEvent(gameId: string, playerId: string): Promise<void> {
            awaiting.startGameAwaiting.setPlayerState(gameId, playerId, StartGameAwaitingPlayerState.AWAITING)

            const game = await gameRepository.getGameById(gameId)
            if (!game) {
                return
            }
            const players = await playerRepository.getPlayersByGameId(gameId)
            if (players.length === game.getNumberPlayers() &&
                awaiting.startGameAwaiting.isAllPlayersHasState(gameId, StartGameAwaitingPlayerState.AWAITING)) {
                awaitingProvider.executeStartGameEvent()
                return
            }

            return awaitingProvider.initStartGameEvent()
        }

        async startGame(gameId: string): Promise<void> {
            awaiting.startGameAwaiting.deleteGameAwaiting(gameId)

            const game = await gameRepository.getGameById(gameId)
            if (!game || game.getState() !== GameStatus.PREPARATION) {
                Logger.error("Game: startGame - ошибка игры на старте")
                return
            }

            game.setState(GameStatus.ACTIVE)
            await gameRepository.updateGame(game)
        }

        addPlayer(gameId: string, playerId: string): void {
            awaiting.startGameAwaiting.addPlayer(gameId, playerId)
        }

        removePlayer(gameId: string, playerId: string): void {
            awaiting.startGameAwaiting.removePlayer(gameId, playerId)
        }

        async onPrepareGame(gameId: string): Promise<void> {
            const game = await gameRepository.getGameById(gameId)
            if (!game || game.getState() !== GameStatus.RECRUITMENT_OF_PLAYERS) {
                Logger.error("Game: onPrepareGame - ошибка игры на шаге подготовки")
                return
            }

            game.setState(GameStatus.PREPARATION)
            await gameRepository.updateGame(game)

            // Этап подготвоки:
            const players = await playerRepository.getPlayersByGameId(gameId)

            // Todo: Перемешать Player, Создать и занести данные в PlayerQueue
            const playerQueue = getRandomOrder(players)
            const playerQueueAwait = []
            for (let i = 0; i < playerQueue.length; i++) {
                playerQueueAwait.push(playerQueueRepository.createPlayerQueue({
                    playerId: (playerQueue[i] as Player).getId(),
                    numberInQueue: i + 1
                }))
            }

            // Todo: Создать и занести данные в ChanceQueue
            const chanceQueue = getRandomOrder(GameData.CHANCE)
            const chanceQueueAwait = []
            for (let i = 0; i < chanceQueue.length; i++) {
                chanceQueueAwait.push(chanceQueueRepository.createChanceQueue(
                    game.getId(),
                    (chanceQueue[i] as ChanceCardType).id,
                    i + 1
                ))
            }

            // Todo: Создать и занести данные в PublicTreasureQueue
            const publicTreasureQueue = getRandomOrder(GameData.PUBLIC_TREASURE)
            const publicTreasureQueueAwait = []
            for (let i = 0; i < publicTreasureQueue.length; i++) {
                publicTreasureQueueAwait.push(publicTreasureQueueRepository.createPublicTreasureQueue(
                    game.getId(),
                    (publicTreasureQueue[i] as PublicTreasureCardType).id,
                    i + 1
                ))
            }

            // Todo: Создать данные в PlayerState
            const playerStateAwait = []
            for (let i = 0; i < players.length; i++) {
                playerStateAwait.push(playerStateRepository.createPlayerState(
                    (players[i] as Player).getId(),
                    GameData.INITIAL_AMOUNT_OF_PLAYERS,
                    PlayerStateStatus.ACTIVE
                ))
            }

            await Promise.all([
                playerQueueAwait,
                chanceQueueAwait,
                publicTreasureQueueAwait,
                playerStateAwait
            ])

            // Todo: Создать и занести данные в GameState

        }
    }
}
