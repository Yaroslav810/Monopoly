import {DataProvider} from "./model/DataProvider"
import {SessionStorage} from "./model/SessionStorage";
import {initApp} from "../core/initApp";
import {settings} from "../core/Settings";
import {mainRouts} from "./modules/main/routs";
import {userRouts} from "./modules/user/routs";
import {gameRouts} from "./modules/game/routs";

const config = {
    port: settings.APP_PORT,
}
const routs = [
    mainRouts,
    userRouts,
    gameRouts
]
const dataProvider = new DataProvider()

dataProvider
    .init()
    .then(() => {
        initApp<DataProvider, SessionStorage>(config, dataProvider, routs)
    });
