import {DbContext} from "../infrastructure/dbContext/context"
import {initGameProvider} from "./Game"
import {initPlayerProvider} from "./Player"
import {initOrderProvider} from "./Orders"
import {gameRepository} from "../infrastructure/repositories/gameRepository"
import {playerRepository} from "../infrastructure/repositories/playerRepository"
import {ordersRepository} from "../infrastructure/repositories/ordersRepository"
import {tempPlayerRepository} from "../infrastructure/repositories/tempPlayerRepository"
import {timerRepository} from "../infrastructure/repositories/timerRepository"

export class DataProvider {
    public async init() {
        return this._dbContext.init()
    }

    private _dbContext = new DbContext()

    private readonly orders = initOrderProvider(
        ordersRepository(),
        playerRepository(this._dbContext),
        tempPlayerRepository()
    )

    readonly game = initGameProvider(
        gameRepository(this._dbContext),
        timerRepository(),
        this.orders
    )

    readonly player = initPlayerProvider(
        playerRepository(this._dbContext),
        tempPlayerRepository(),
        gameRepository(this._dbContext),
        timerRepository()
    )
}
