import {DataProvider} from "./model/DataProvider"
import {mainRouts} from "./modules/main/routs";
import {SessionStorage} from "./model/SessionStorage";
import {initApp} from "../core/initApp";
import {userRouts} from "./modules/user/routs";
import * as dotenv from "dotenv";

dotenv.config();
const config = {
    port: 3800,
}
const routs = [
    mainRouts,
    userRouts
]
const dataProvider = new DataProvider()
dataProvider.init().then(() => {
    initApp<DataProvider, SessionStorage>(config, dataProvider, routs)
});
