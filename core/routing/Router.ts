import {IRouter, Route} from "./IRouter"
import {SessionsManager} from "../session/SessionManager"
import {HttpStatus} from "../http/HttpStatuses"
import {HttpError} from "../http/HttpError"
import {ValidationError, Validator} from "../scheme/_common"
import {Logger} from "../Logger"
import {IServer, Request, Response} from "./IServer"

export class Router<DATA, SESSION_DATA> implements IRouter<DATA, SESSION_DATA> {
    constructor(server: IServer, sessionsManager: SessionsManager<SESSION_DATA>, dataProvider: DATA) {
        this._server = server
        this._sessionsManager = sessionsManager
        this._dataProvider = dataProvider
    }

    addRout<PATH, REQUEST, RESPONSE>(rout: Route<DATA, SESSION_DATA, PATH, REQUEST, RESPONSE>): void {
        this._server.listen(
            rout.method,
            rout.path,
            (reqest, response) => this._requesonResolver(rout, reqest, response)
        )
    }

    private async _requesonResolver<PATH, REQUEST, RESPONSE>(rout: Route<DATA, SESSION_DATA, PATH, REQUEST, RESPONSE>, req: Request, res: Response): Promise<void> {
        try {
            const response = await this._executeAction(rout, req)
            res.setStatus(HttpStatus.OK)
            res.resolveJson(response)
        } catch (e) {
            Router._resolveError(e, res)
        }
    }

    private async _executeAction<PATH, REQUEST, RESPONSE>(rout: Route<DATA, SESSION_DATA, PATH, REQUEST, RESPONSE>, req: Request): Promise<RESPONSE> {
        const sessionsManager = this._sessionsManager
        const dataProvider = this._dataProvider
        const {path, request} = Router._parseRequestData(rout, req)
        const response = await rout.action({sessionsManager, dataProvider}, path, request)
        return Router._validateResponse(rout.responseScheme, response)
    }

    private static _resolveError(error: Error, res: Response): void {
        if (error instanceof HttpError) {
            res.setStatus(error.status)
            switch (error.status) {
                case HttpStatus.REDIRECT:
                    return res.redirect(error.message)
                case HttpStatus.BAD_REQUEST:
                    return res.resolveText(`Bad request: ${error.message}`)
                case HttpStatus.UNAUTHORIZED:
                    return res.resolveText(`Unaithorized: ${error.message}`)
                case HttpStatus.FORBIDDEN:
                    return res.resolveText(`Forbidden: ${error.message}`)
                case HttpStatus.NOT_FOUND:
                    return res.resolveText(`Not found: ${error.message}`)
            }
        }
        Router._resolve500(error, res)
    }

    private static _validateResponse<R>(validator: Validator<R>, response: R): R {
        try {
            return validator(response)
        } catch (e) {
            Logger.error(e)
            throw new HttpError(HttpStatus.INTERNAL_ERROR)
        }
    }

    private static _parseRequestData<PATH, REQUEST>(
        {pathVariables, requestScheme}: { pathVariables: Validator<PATH>, requestScheme: Validator<REQUEST> },
        req: Request
    ): {
		path: PATH,
		request: REQUEST,
	} {
        try {
            return {
                path: pathVariables(req.url),
                request: requestScheme({...req.body, ...req.queryString})
            }
        } catch (e) {
            if (e instanceof ValidationError) {
                throw new HttpError(HttpStatus.BAD_REQUEST, "\n" + e.message)
            }
            throw new HttpError(HttpStatus.INTERNAL_ERROR, e.message)
        }
    }

    private static _resolve500(err: Error, res: Response) {
        Logger.error(err)
        res.setStatus(HttpStatus.INTERNAL_ERROR)
        res.resolveText("Oops, something go wrong")
    }

	private readonly _server: IServer;
	private readonly _sessionsManager: SessionsManager<SESSION_DATA>;
	private readonly _dataProvider: DATA;
}
