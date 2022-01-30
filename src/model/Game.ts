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
import {getRandomDiceValue, getRandomOrder} from "../common/utils"
import {Player} from "../infrastructure/repositories/mappers/entities/Player"
import {ChanceCardType, GameData, PublicTreasureCardType} from "../constants/Game/GameData"
import {ChanceQueueRepository} from "../infrastructure/repositories/chanceQueueRepository"
import {PublicTreasureQueueRepository} from "../infrastructure/repositories/publicTreasureQueueRepository"
import {PlayerStateRepository} from "../infrastructure/repositories/playerStateRepository"
import {PlayerStateStatus} from "../infrastructure/configurations/PlayerState"
import {GameStateRepository} from "../infrastructure/repositories/gameStateRepository"
import {ChanceQueue} from "../infrastructure/repositories/mappers/entities/ChanceQueue"
import {PublicTreasureQueue} from "../infrastructure/repositories/mappers/entities/PublicTreasureQueue"
import {notEmpty} from "../../core/utils/typeutils"
import {PlayerQueue} from "../infrastructure/repositories/mappers/entities/PlayerQueue"

interface AvailableGame {
    gameToken: string,
    numberPlayers: number,
    players: {
        name: string,
        playerToken: string
    }[]
}

type DiceRoll = [number, number]

interface MakeMove {
    diceValues: DiceRoll,
    currentPosition: number
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
    gameStateRepository: GameStateRepository,
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

        async getCurrentPlayer(gameId: string): Promise<Player | null> {
            const gameState = await gameStateRepository.getGameStateByGameId(gameId)
            if (!gameState) {
                return null
            }

            return playerRepository.getPlayerById(gameState.getCurrentPlayer())
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
                this.startGame(gameId).then()
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

            // Todo: Перемешать Player, Создать и занести данные в PlayerQueue
            const playerQueue = getRandomOrder(players)
            const playerQueueAwait = []
            for (let i = 0; i < playerQueue.length; i++) {
                playerQueueAwait.push(playerQueueRepository.createPlayerQueue({
                    playerId: (playerQueue[i] as Player).getId(),
                    numberInQueue: i + 1
                }))
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

            const result = await Promise.all([
                chanceQueueAwait,
                publicTreasureQueueAwait,
                playerQueueAwait,
                playerStateAwait
            ])


            // Todo: Создать и занести данные в GameState
            const currentChance = await (result[0][0] as Promise<ChanceQueue>)
            const currentPublicTreasure = await (result[1][0] as Promise<PublicTreasureQueue>)

            if (!currentChance || !currentPublicTreasure) {
                Logger.error("Ошибка создания GameState")
                return
            }
            await gameStateRepository.createGameState(
                game.getId(),
                (playerQueue[0] as Player).getId(),
                currentChance.getId(),
                currentPublicTreasure.getId()
            )
        }

        async isMoveThisPlayer(playerId: string): Promise<boolean> {
            const player = await playerRepository.getPlayerById(playerId)
            if (!player) {
                return false
            }

            const gameState = await gameStateRepository.getGameStateByGameId(player.getGameId())
            return !(!gameState || gameState.getCurrentPlayer() !== player.getId())
        }

        async makeMove(playerId: string): Promise<MakeMove | null> {
            const playerState = await playerStateRepository.getPlayerStateByPlayerId(playerId)
            if (!playerState || !playerState.getPositionOnMap()) {
                return null
            }
            const valuesDice: DiceRoll = [getRandomDiceValue(), getRandomDiceValue()]
            let newPosition = (playerState.getPositionOnMap() as number) + (valuesDice[0] as number) + (valuesDice[1] as number)
            if (newPosition > GameData.MAP.length) {
                // Todo: Начислить сумму за прохождение круга
                newPosition %= GameData.MAP.length
            }

            const player = await playerRepository.getPlayerById(playerState.getPlayerId())
            if (!player) {
                return null
            }

            playerState.setPositionOnMap(newPosition)
            await Promise.all([
                this.goNextPlayer(player.getGameId()),
                playerStateRepository.updatePlayerState(playerState)
            ])

            awaitingProvider.executeGameProgressEvent()

            return {
                diceValues: valuesDice,
                currentPosition: newPosition
            }
        }

        async goNextPlayer(gameId: string) {
            const players = await playerRepository.getPlayersByGameId(gameId)

            const queueAwait = []
            for (const player of players) {
                queueAwait.push(playerQueueRepository.getPlayerQueueByPlayerId(player.getId()))
            }
            const queue = (await Promise.all(queueAwait)).filter(notEmpty).sort((a, b) => a.getNumberInQueue() - b.getNumberInQueue())

            const gameState = await gameStateRepository.getGameStateByGameId(gameId)
            if (!gameState) {
                return
            }

            let index = queue.findIndex(pl => pl.getPlayerId() === gameState.getCurrentPlayer())
            index = (index === queue.length - 1) ? 0 : ++index

            // TODO: Проверить доступность другого игрока (active)

            gameState.setCurrentPlayer((queue[index] as PlayerQueue).getPlayerId())
            await gameStateRepository.updateGameState(gameState)
        }

        async gameProgressEvent(): Promise<void> {
            return awaitingProvider.initGameProgressEvent()
        }
    }
}
