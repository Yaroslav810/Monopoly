import {Sequelize} from "sequelize";
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
            logging: msg => Logger.log(msg)
        })

    readonly user = initUserProvider(this._sequelize)
    readonly game = intiGameProvider(this._sequelize)
}
