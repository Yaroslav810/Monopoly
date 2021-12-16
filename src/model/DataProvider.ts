import {DbContext} from "../infrastructure/dbContext/context"
import {GameRepository} from "../infrastructure/repositories/gameRepository"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"
import {initGameProvider} from "./Game"
import {initPlayerProvider} from "./Player"

export class DataProvider {
    public async init() {
        return this._dbContext.init()
    }

    private _dbContext = new DbContext()

    private readonly gameRepository = new GameRepository(this._dbContext)
    private readonly playerRepository = new PlayerRepository(this._dbContext)

    readonly game = initGameProvider(
        this.gameRepository,
        this.playerRepository
    )

    readonly player = initPlayerProvider(
        this.playerRepository,
        this.gameRepository
    )
}
