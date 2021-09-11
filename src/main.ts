import {DataProvider} from "./model/DataProvider"
import {SessionStorage} from "./model/SessionStorage";
import {initApp} from "../core/initApp";
import {settings} from "../core/Settings";
import {playerRouts} from "./modules/player/routs";
import {gameRouts} from "./modules/game/routs";
import { teamRouts } from "./modules/team/routs";

const config = {
    port: settings.APP_PORT,
}
const routs = [
    playerRouts,
    gameRouts,
    teamRouts
]
const dataProvider = new DataProvider()

dataProvider
    .init()
    .then(() => {
        initApp<DataProvider, SessionStorage>(config, dataProvider, routs)
    });
