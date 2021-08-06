import {DataProvider} from "./model/DataProvider"
import {mainRouts} from "./modules/main/routs";
import {SessionStorage} from "./model/SessionStorage";
import {initApp} from "../core/initApp";
import {userRouts} from "./modules/user/routs";
import {settings} from "../core/Settings";

const config = {
    port: settings.APP_PORT,
}
const routs = [
    mainRouts,
    userRouts
]
const dataProvider = new DataProvider()
dataProvider.init().then(() => {
    initApp<DataProvider, SessionStorage>(config, dataProvider, routs)
});
