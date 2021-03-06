import * as joi from "joi"

export type Validator<T> = (val: any) => T;

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)

        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}

export function checkType<T>(val: any, type: string): T {
    if (typeof val !== type) {
        throw new ValidationError(`${val} typed as ${typeof val} is not a ${type}`)
    }
    return val as T
}

export function checkExtends<T>(val: any, type: any): T {
    if (val instanceof type) {
        return val as T
    }
    throw new ValidationError(`${val} is not instance of ${type}`)
}

type JoiValidator<T> = (val: T) => {error?: joi.ValidationError}
type TypeChecker<T> = (val: any) => T

export function joiValidatorAdapter<T>(typeCheckFn: TypeChecker<T>, validator: JoiValidator<T>, message: (val: T) => string): Validator<T> {
    return (val) => {
        const str = typeCheckFn(val)
        if (validator(str).error) {
            throw new ValidationError(message(str))
        }
        return str as T
    }
}
