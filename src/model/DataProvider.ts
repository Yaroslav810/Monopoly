import {Sequelize} from "sequelize";
import {initUserProvider} from "./User";
import {Logger} from "../../core/Logger";

export class DataProvider {
    public async init() {
        return this._sequelize.sync({force: true})
    }

    private _sequelize = new Sequelize(
        process.env["DB_NAME"] as string, 
        process.env["DB_USER"] as string, 
        process.env["DB_PASSWORD"] as string, 
        {
            dialect: 'mysql',
            host: process.env["DB_HOST"] as string,
            port: parseInt(process.env["DB_PORT"] as string),
            logging: msg => Logger.log(msg)
        })

    readonly user = initUserProvider(this._sequelize)
}
