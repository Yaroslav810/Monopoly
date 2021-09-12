import {HttpStatus} from "./HttpStatuses"

export class HttpError extends Error {
    constructor(status: HttpStatus, message = "") {
        super(message)
        this.status = status

        Object.setPrototypeOf(this, HttpError.prototype)
    }

	public readonly status: HttpStatus;
}
