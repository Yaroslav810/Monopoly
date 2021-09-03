import {HttpError} from "./HttpError";
import {HttpStatus} from "./HttpStatuses";

export function verifyExisting<T>(item: null|T): T {
	if (!item) {
		throw new HttpError(HttpStatus.NOT_FOUND, 'Not found');
	}
	return item
}

export function verifyParameter<T>(parametr: T|null, message: string): T {
	if (parametr == null) {
		throw new HttpError(HttpStatus.BAD_REQUEST, message);
	}
	return parametr
}

export function sendUnauthorized(message: string = 'Unauthorized') {
	throw new HttpError(HttpStatus.UNAUTHORIZED, message)
}

export function sendForbidden(message: string) {
	throw new HttpError(HttpStatus.FORBIDDEN, message);
}
