import {Sequelize} from "sequelize"
import {settings} from "../../../core/Settings"
import {Logger} from "../../../core/Logger"
import {initGameConfiguration} from "../configurations/Game"
import {initPlayerConfiguration} from "../configurations/Player"
import {initPlayerStateConfiguration} from "../configurations/PlayerState"
import {initPlayerQueueConfiguration} from "../configurations/PlayerQueue"
import {initChanceQueueConfiguration} from "../configurations/ChanceQueue"
import {initPublicTreasureQueueConfiguration} from "../configurations/PublicTreasureQueue"
import {initPropertyConfiguration} from "../configurations/Property"
import {initGameStateConfiguration} from "../configurations/GameState"
import {initActionConfiguration} from "../configurations/Action"
import {initMotionActionConfiguration} from "../configurations/MotionAction"

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
                freezeTableName: true,
                underscored: true
            }
        })

    readonly game = initGameConfiguration(this._sequelize)
    readonly player = initPlayerConfiguration(this._sequelize)
    readonly playerState = initPlayerStateConfiguration(this._sequelize)
    readonly playerQueue = initPlayerQueueConfiguration(this._sequelize)
    readonly chanceQueue = initChanceQueueConfiguration(this._sequelize)
    readonly publicTreasureQueue = initPublicTreasureQueueConfiguration(this._sequelize)
    readonly property = initPropertyConfiguration(this._sequelize)
    readonly gameState = initGameStateConfiguration(this._sequelize)

    readonly action = initActionConfiguration(this._sequelize)
    readonly motionAction = initMotionActionConfiguration(this._sequelize)
}
