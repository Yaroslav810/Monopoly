import {DbContext} from "../infrastructure/dbContext/context"
import {gameRepository} from "../infrastructure/repositories/gameRepository"
import {timerRepository} from "../infrastructure/repositories/timerRepository"
import {playerRepository} from "../infrastructure/repositories/playerRepository"
import {initGameProvider} from "./Game"
import {initPlayerProvider} from "./Player"

export class DataProvider {
    public async init() {
        return this._dbContext.init()
    }

    private _dbContext = new DbContext()

    readonly game = initGameProvider(
        gameRepository(this._dbContext),
        playerRepository(this._dbContext),
        timerRepository(),
    )

    readonly player = initPlayerProvider(
        playerRepository(this._dbContext),
        gameRepository(this._dbContext),
        timerRepository()
    )
}
