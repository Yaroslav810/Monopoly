import {initApp} from "../core/initApp";
import {settings} from "./Settings";
import {mainRouts} from "./modules/main/routs";
import {playerRouts} from "./modules/player/routs";
import {gameRouts} from "./modules/game/routs";
import {teamRouts} from "./modules/team/routs";
import {initDataProvider} from "./model/DataProvider";

const config = {
    port: settings.APP_PORT,
}
const routs = [
    mainRouts,
    playerRouts,
    gameRouts,
    teamRouts
]

initApp(config, initDataProvider, routs)


