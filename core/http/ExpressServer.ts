import * as express from "express"
import * as bodyParser from "body-parser"
import {Request as ExpressRequest, Response as ExpressResponse} from "express-serve-static-core"
import {IServer, Request, Response} from "../routing/IServer"
import {HttpMethod} from "./HttpMethod"
import {HttpStatus} from "./HttpStatuses"

export class ExpressServer implements IServer {
    constructor() {
        this._app.use(bodyParser.urlencoded({extended: true}))
        this._app.use(bodyParser.json())
    }

    public listen(method: HttpMethod, path: string, handler: (request: Request, response: Response) => void): void {
        const listener = (req: ExpressRequest, res: ExpressResponse) => handler(
            ExpressServer._mapRequest(req),
            ExpressServer._mapResponse(res)
        )
        switch (method) {
        case HttpMethod.GET:
            this._app.get(path, listener)
            break
        case HttpMethod.POST:
            this._app.post(path, listener)
            break
        }
    }

    public start({port}: {port: number}): void {
        this._app.use((_, res) => {
            res.sendStatus(404) 
        })
        this._app.listen(port, () => {
            console.log("Start listening port: ", port)
        })
    }

    private static _mapResponse(res: ExpressResponse): Response {
        return {
            setStatus(status: HttpStatus): void {
                res.status(status)
            },
            redirect(message: string): void {
                res.redirect(message)
            },
            resolveJson(obj: any): void {
                res.json(obj)
            },
            resolveText(message: string): void {
                res.send(message)
            }
        }
    }

    private static _mapRequest(req: ExpressRequest): Request {
        return {
            url: req.params,
            queryString: req.query,
            body: req.body
        }
    }

	private readonly _app = express();
}
