import {Sequelize} from "sequelize";
import {initNativeAmericanProvider} from "./NativeAmerican";
import {initClanProvider} from "./Clan";
import {Logger} from "../../core/Logger";
import {settings} from "../../core/Settings";
import {initUserProvider} from "./User";
import { intiGameProvider } from "./Game";

export class DataProvider {
    public async init() {
        return this._sequelize.sync({ force: true })
    }

    private _sequelize = new Sequelize(
        settings.DB_NAME, 
        settings.DB_USER, 
        settings.DB_PASSWORD, 
        {
            dialect: 'mysql',
            host: settings.DB_HOST,
            port: settings.DB_PORT,
            logging: msg => Logger.log(msg),
            define: {
                timestamps: false,
                freezeTableName: true
            }
        })

    readonly user = initUserProvider(this._sequelize)
    readonly game = intiGameProvider(this._sequelize)
    readonly nativeAmerican = initNativeAmericanProvider(this._sequelize)
    readonly clan = initClanProvider(this._sequelize)
}
