import {Sequelize} from "sequelize"
import {settings} from "../../../core/Settings"
import {Logger} from "../../../core/Logger"
import {initGameConfiguration} from "../configurations/Game"
import {initPlayerConfiguration} from "../configurations/Player"

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
}
