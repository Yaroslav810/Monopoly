import {DbContext} from "../infrastructure/dbContext/context"
import {initPlayerRepository} from "../infrastructure/repositories/playerRepository"
import {initGameProvider} from "./Game"
import {initPlayerProvider} from "./Player"
import {initEventBindingProvider} from "./EventBinding"
import {initGameRepository} from "../infrastructure/repositories/gameRepository"
import {initAwaiting} from "./awaiting/Awaiting"
import {initBankProvider} from "./Bank"
import {initPlayerStateRepository} from "../infrastructure/repositories/playerStateRepository"
import {initPropertyRepository} from "../infrastructure/repositories/propertyRepository"
import {initPlayerQueueRepository} from "../infrastructure/repositories/playerQueueRepository"
import {initChanceQueueRepository} from "../infrastructure/repositories/chanceQueueRepository"
import {initPublicTreasureQueueRepository} from "../infrastructure/repositories/publicTreasureQueueRepository"
import {initGameStateRepository} from "../infrastructure/repositories/gameStateRepository"

export class DataProvider {
    public async init() {
        return this._dbContext.init()
    }

    private _dbContext = new DbContext()
    private readonly gameRepository = initGameRepository(this._dbContext)
    private readonly playerRepository = initPlayerRepository(this._dbContext)
    private readonly playerStateRepository = initPlayerStateRepository(this._dbContext)
    private readonly propertyState = initPropertyRepository(this._dbContext)
    private readonly playerQueue = initPlayerQueueRepository(this._dbContext)
    private readonly chanceQueue = initChanceQueueRepository(this._dbContext)
    private readonly publicTreasureQueue = initPublicTreasureQueueRepository(this._dbContext)
    private readonly playerState = initPlayerStateRepository(this._dbContext)
    private readonly gameState = initGameStateRepository(this._dbContext)
    private readonly awaiting = initAwaiting()

    private readonly awaitingProvider = initEventBindingProvider()
    private readonly bank = initBankProvider(
        this.playerStateRepository,
        this.propertyState
    )

    readonly game = initGameProvider(
        this.gameRepository,
        this.playerRepository,
        this.awaiting,
        this.playerQueue,
        this.chanceQueue,
        this.publicTreasureQueue,
        this.playerState,
        this.gameState,
        this.awaitingProvider,
        this.bank
    )

    readonly player = initPlayerProvider(
        this.playerRepository,
        this.gameRepository,
        this.playerStateRepository,
        this.playerQueue
    )
}
