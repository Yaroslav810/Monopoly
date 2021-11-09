// import {Sequelize} from "sequelize"
// import {Logger} from "../../core/Logger"
// import {settings} from "../../core/Settings"
// import {initNativeAmericanProvider} from "./NativeAmerican"
// import {initGameProvider} from "./Game"
// import {initOrdersProvider} from "./temporary/orders/Orders"
// import {initTeamProvider} from "./Team"
// import {initStaticObjectProvider} from "./StaticObject"
// import {initCityProvider} from "./City"
// import {initCityProductProvider} from "./CityProduct"
// import {initGuardRailwayCompanyProvider} from "./GuardRailwayCompany"
// import {initRailwayProvider} from "./Railway"
// import {initRiverProvider} from "./River"
// import {initWarehouseProvider} from "./Warehouse"
// import {initArmyProvider} from "./Army"
// import {initTimerProvider} from "./temporary/Timer"

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

    readonly game = initGameProvider(
        gameRepository(this._dbContext),
        timerRepository()
    )
    readonly player = initPlayerProvider(
        playerRepository(this._dbContext),
        tempPlayerRepository(),
        gameRepository(this._dbContext),
        timerRepository()
    )
    readonly orders = initOrderProvider(
        ordersRepository(),
        playerRepository(this._dbContext),
        tempPlayerRepository()
    )

    // readonly nativeAmerican = initNativeAmericanProvider(this._sequelize)
    // readonly staticObject = initStaticObjectProvider(this._sequelize)
    // readonly army = initArmyProvider(this._sequelize)
    // readonly city = initCityProvider(this._sequelize)
    // readonly rout = initCityProvider(this._sequelize)
    // readonly guardRailwayCompany = initGuardRailwayCompanyProvider(this._sequelize)
    // readonly railway = initRailwayProvider(this._sequelize)
    // readonly warehouse = initWarehouseProvider(this._sequelize)
    // readonly cityProduct = initCityProductProvider(this._sequelize)
    // readonly river = initRiverProvider(this._sequelize)
    // readonly team = initTeamProvider(this)

    // readonly timer = initTimerProvider()
}
