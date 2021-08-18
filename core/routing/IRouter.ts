import {HttpMethod} from "../http/HttpMethod";
import {Validator} from "../scheme/_common";
import {ISessionManager} from "../session/ISessionManager";

export type Context<DATA_PROVIDER, SESSION_STORAGE> = {dataProvider: DATA_PROVIDER, sessionsManager: ISessionManager<SESSION_STORAGE>}

export type BaseAction<DATA_PROVIDER, SESSION_STORAGE, PATH_PARAMS, REQUEST_PARAMS, RESPONSE_PARAMS> = (
	context: Context<DATA_PROVIDER, SESSION_STORAGE>,
	path: PATH_PARAMS,
	request: REQUEST_PARAMS
) => Promise<RESPONSE_PARAMS>;

export type Route<DATA_PROVIDER, SESSION_STORAGE, PATH_PARAMS, REQUEST_PARAMS, RESPONSE_PARAMS> = {
	path: string,
	method: HttpMethod,
	pathVariables: Validator<PATH_PARAMS>,
	requestScheme: Validator<REQUEST_PARAMS>,
	responseScheme: Validator<RESPONSE_PARAMS>,
	action: BaseAction<DATA_PROVIDER, SESSION_STORAGE, PATH_PARAMS, REQUEST_PARAMS, RESPONSE_PARAMS>,
};

export interface IRouter<DATA_PROVIDER, SESSION_STORAGE> {
	addRout<
		PATH_PARAMS,
		REQUEST_PARAMS,
		RESPONSE_PARAMS
	>(
		route: Route<
			DATA_PROVIDER,
			SESSION_STORAGE,
			PATH_PARAMS,
			REQUEST_PARAMS,
			RESPONSE_PARAMS
		>
	): void;
}
