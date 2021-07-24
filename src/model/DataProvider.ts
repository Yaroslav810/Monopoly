import {Sequelize} from "sequelize";
import {initUserProvider} from "./User";
import {Logger} from "../../core/Logger";

export class DataProvider {
    public async init() {
        return this._sequelize.sync({force: true})
    }

    private _sequelize = new Sequelize('sqlite::memory:', {
        logging: msg => Logger.log(msg),
    })
    readonly user = initUserProvider(this._sequelize)
}