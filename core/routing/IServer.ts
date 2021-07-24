import { HttpMethod } from "../http/HttpMethod";
import { HttpStatus } from "../http/HttpStatuses";

export interface IServer {
    listen(method: HttpMethod, path: string, heandler: (request: Request, response: Response) => void): void
}

export interface Request {
    //deserialized parameters in key=value view
    url: Object,
    queryString: Object,
    body: Object,
}

export interface Response {
    setStatus(status: HttpStatus): void
    redirect(message: string): void
    resolveJson(obj: any): void
    resolveText(message: string): void
}