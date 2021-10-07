import {BaseAction} from "../../../core/routing/IRouter"
import {Validator} from "../../../core/scheme/_common"
import {DataProvider} from "../../model/DataProvider"
import {SessionStorage} from "../../model/SessionStorage"
import {empty} from "../../../core/scheme/pseudo"

export type SchemeType<SCHEME extends () => Validator<unknown>> = SCHEME extends () => Validator<infer T> ? T : never;

export type ActionSchemes<
    PATH_SCHEME extends EmptyScheme = EmptyScheme,
    REQUEST_SCHEME extends EmptyScheme = EmptyScheme,
    RESPONSE_SCHEME extends EmptyScheme = EmptyScheme
> = {
    PathVariables: PATH_SCHEME,
    Request: REQUEST_SCHEME,
    Response: RESPONSE_SCHEME,
};

export type EmptyScheme = typeof empty

export type Action<SCHEMES extends ActionSchemes> = BaseAction<
    DataProvider,
    SessionStorage,
    SchemeType<SCHEMES["PathVariables"]>,
    SchemeType<SCHEMES["Request"]>,
    SchemeType<SCHEMES["Response"]>
>
