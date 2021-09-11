import {Sequelize} from "sequelize"
import {Logger} from "../../core/Logger"
import {settings} from "../../core/Settings"
import {initGameProvider} from "./Game"
import {initOrdersProvider} from "./Orders"
import {initPlayerProvider} from "./Player"
import {initTeamProvider} from "./Team"

export class DataProvider {
    public async init(): Promise<Sequelize> {
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
    readonly player = initPlayerProvider(this._sequelize)
    readonly team = initTeamProvider(this)
    readonly orders = initOrdersProvider()
}
