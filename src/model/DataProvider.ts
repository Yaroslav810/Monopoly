import {Sequelize} from "sequelize";
import {initUserProvider} from "./User";
import {Logger} from "../../core/Logger";
import {settings} from "../../core/Settings";

export class DataProvider {
    public async init() {
        return this._sequelize.sync({force: true})
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
}
