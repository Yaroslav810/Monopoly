import {Sequelize} from "sequelize"
import {settings} from "../../../core/Settings"
import {Logger} from "../../../core/Logger"
import {initGameConfiguration} from "../configurations/Game"
import {initPlayerConfiguration} from "../configurations/Player"
import {initPoliticianConfiguration} from "../configurations/Politician"
import {initNativeAmericanConfiguration} from "../configurations/NativeAmerican"
import {initStaticObjectConfiguration} from "../configurations/StaticObject"
import {initArmyConfiguration} from "../configurations/Army"
import {initCityConfiguration} from "../configurations/City"
import {initGuardRailwayCompanyConfiguration} from "../configurations/GuardRailwayCompany"
import {initRailwayConfiguration} from "../configurations/Railway"
import {initWarehouseConfiguration} from "../configurations/Warehouse"
import {initCityProductConfiguration} from "../configurations/CityProduct"
import {initRiverConfiguration} from "../configurations/River"
import {initRoutConfiguration} from "../configurations/Rout"
import {initRailwayCompanyOfficeConfiguration} from "../configurations/RailwayCompanyOffice"

export class DbContext {
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

    readonly game = initGameConfiguration(this._sequelize)
    readonly player = initPlayerConfiguration(this._sequelize)
    readonly politician = initPoliticianConfiguration(this._sequelize)
    readonly nativeAmerican = initNativeAmericanConfiguration(this._sequelize)
    readonly staticObject = initStaticObjectConfiguration(this._sequelize)
    readonly army = initArmyConfiguration(this._sequelize)
    readonly city = initCityConfiguration(this._sequelize)
    readonly guardRailwayCompany = initGuardRailwayCompanyConfiguration(this._sequelize)
    readonly railway = initRailwayConfiguration(this._sequelize)
    readonly warehouse = initWarehouseConfiguration(this._sequelize)
    readonly cityProduct = initCityProductConfiguration(this._sequelize)
    readonly river = initRiverConfiguration(this._sequelize)
    readonly rout = initRoutConfiguration(this._sequelize)
    readonly railwayCompanyOffice = initRailwayCompanyOfficeConfiguration(this._sequelize)
}
