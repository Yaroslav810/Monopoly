import {DataProvider} from "./model/DataProvider"
import {SessionStorage} from "./model/SessionStorage"
import {settings} from "../core/Settings"
import {initApp} from "../core/initApp"
import {playerRouts} from "./modules/player/routes"
import {gameRouts} from "./modules/game/routes"
import {teamRouts} from "./modules/team/routes"

const config = {
    port: settings.APP_PORT
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
    })
