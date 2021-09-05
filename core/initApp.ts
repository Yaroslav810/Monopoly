import {Router} from "./routing/Router";
import {ExpressServer} from "./http/ExpressServer";
import {SessionsManager} from "./session/SessionManager";

export async function initApp<DATA_PROVIDER, SESSION_STORAGE>(
    config: {port: number},
    initDataProvider: () => Promise<DATA_PROVIDER>,
    initsRouts: Array<(router: Router<DATA_PROVIDER, SESSION_STORAGE>) => void>,
) {
    const dataProvider = await initDataProvider()
    const server = new ExpressServer()
    const sessionManager = new SessionsManager<SESSION_STORAGE>()
    const router = new Router(server, sessionManager, dataProvider)
    for (const initFn of initsRouts) {
        initFn(router)
    }

    server.start(config)
}