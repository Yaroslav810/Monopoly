import {Router} from "./routing/Router";
import {ExpressServer} from "./http/ExpressServer";
import {SessionsManager} from "./session/SessionManager";
import { HttpMethod } from "./http/HttpMethod";

export function initApp<DATA_PROVIDER, SESSION_STORAGE>(
    config: {port: number},
    dataProvider: DATA_PROVIDER,
    initsRouts: Array<(router: Router<DATA_PROVIDER, SESSION_STORAGE>) => void>,
) {
    const server = new ExpressServer()
    const sessionManager = new SessionsManager<SESSION_STORAGE>()
    const router = new Router(server, sessionManager, dataProvider)
    for (const initFn of initsRouts) {
        initFn(router)
    }

    server.start(config)
    
    server.listen(HttpMethod.POST, '/', (req, res) => {
        console.log(req.body)
        res.resolveJson({id: 1, name: 'Ivan'})
    })
}