import {settings} from "../Settings";
import {initSequelizeDataProvider, SequelizeDataProvider} from "../../core/model/initSequelizeDataProvider";
import {Logger} from "../../core/Logger";
import {GameCreator} from "./Game";
import {PlayerCreator} from "./Player";

export type DataProvider = SequelizeDataProvider<typeof initDataProvider>

export function initDataProvider() {
    return initSequelizeDataProvider({
        name: settings.DB_NAME,
        user: settings.DB_USER,
        password: settings.DB_PASSWORD,
        options: {
            dialect: 'mysql',
            host: settings.DB_HOST,
            port: settings.DB_PORT,
            logging: msg => Logger.log(msg)
        }
    }, {
        game: GameCreator,
        player: PlayerCreator,
    }, ({game, player}) => {
        game.hasMany(player)
        player.belongsTo(game)
    })
}