import {nullable} from "../utils/typeutils";
import {generateUUId} from "../utils/UUIDUtils";
import {ISessionManager} from "./ISessionManager";
import {verifyParameter} from "../http/httputils";

const SESSION_LIFETIME = 1000 * 60 * 60 * 2; //2 hours

export class SessionsManager<SESSION_STORAGE> implements ISessionManager<SESSION_STORAGE> {
	init(dataProvider: SESSION_STORAGE): string {
		const id = generateUUId();
		this._sessions.set(id, dataProvider);
		this._initSessionDeleteCallback(id);
		return id;
	}

	delete(token: string): void {
		this._sessions.delete(token);
		const clearKey = this._sessionClearKey.get(token);
		if (clearKey) {
			clearTimeout(clearKey);
		}
		this._sessionClearKey.delete(token)
	}

	sessionDataProvider(token: string): SESSION_STORAGE | null {
		this._initSessionDeleteCallback(token);
		return nullable(this._sessions.get(token));
	}

	verifiedSessionDataProvider(token: string): SESSION_STORAGE {
		return verifyParameter(this.sessionDataProvider(token), 'Incorrect sessionId');
	}

	private _initSessionDeleteCallback(id: string) {
		this._sessionClearKey.set(id, setTimeout(() => this.delete(id), SESSION_LIFETIME));
	}

	private readonly _sessions = new Map<string, SESSION_STORAGE>();
	private readonly _sessionClearKey = new Map<string, any>();
}