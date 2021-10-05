import {Sequelize} from "sequelize"
import {Logger} from "../../core/Logger"
import {settings} from "../../core/Settings"
import {initNativeAmericanProvider} from "./NativeAmerican"
import {initGameProvider} from "./Game"
import {initOrdersProvider} from "./temporary/orders/Orders"
import {initPlayerProvider} from "./Player"
import {initTeamProvider} from "./Team"
import {initStaticObjectProvider} from "./StaticObject"
import {initCityProvider} from "./City"
import {initCityProductProvider} from "./CityProduct"
import {initGuardRailwayCompanyProvider} from "./GuardRailwayCompany"
import {initRailwayProvider} from "./Railway"
import {initRiverProvider} from "./River"
import {initWarehouseProvider} from "./Warehouse"
import {initArmyProvider} from "./Army"
import {initPlayersStateProvider} from "./temporary/PlayersState"
import {initTimerProvider} from "./temporary/Timer"

export class DataProvider {
    public async init() {
        return this._sequelize.sync({force: true})
    }

    private _sequelize = new Sequelize(
        settings.DB_NAME, 
        settings.DB_USER, 
        settings.DB_PASSWORD, 
        {
            dialect: "mysql",
            host: settings.DB_HOST,
            port: settings.DB_PORT,
            logging: msg => Logger.log(msg),
            define: {
                freezeTableName: true
            }
        })

    readonly game = initGameProvider(this._sequelize)
    readonly nativeAmerican = initNativeAmericanProvider(this._sequelize)
    readonly staticObject = initStaticObjectProvider(this._sequelize)
    readonly army = initArmyProvider(this._sequelize)
    readonly city = initCityProvider(this._sequelize)
    readonly rout = initCityProvider(this._sequelize)
    readonly guardRailwayCompany = initGuardRailwayCompanyProvider(this._sequelize)
    readonly railway = initRailwayProvider(this._sequelize)
    readonly warehouse = initWarehouseProvider(this._sequelize)
    readonly cityProduct = initCityProductProvider(this._sequelize)
    readonly river = initRiverProvider(this._sequelize)
    readonly player = initPlayerProvider(this._sequelize)
    readonly team = initTeamProvider(this)
    readonly orders = initOrdersProvider()
    readonly playersState = initPlayersStateProvider()
    readonly timer = initTimerProvider()
}
