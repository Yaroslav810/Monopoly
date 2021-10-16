import {checkType, Validator} from "./_common"

export function boolean(): Validator<boolean> {
    return (val) => checkType<boolean>(val, "boolean")
}
