import {checkType, ValidationError, Validator} from "./_common"

export function object<T>(fields: {[key in keyof T]: Validator<T[key]>}): Validator<T> {
    return (val) => {
        const typedVal = checkType<{ [index: string]: any }>(val, "object")
        const fieldsErrors = new Array<{key: string, message: string}>()
        for (const key of Object.keys(fields)) {
            try {
                typedVal[key] = fields[key as keyof T](typedVal[key])
            } catch (e) {
                if (e instanceof ValidationError) {
                    fieldsErrors.push({key, message: e.message})
                } else {
                    throw e
                }
            }
        }
        if (Object.keys(fieldsErrors).length) {
            const fieldsMessage = fieldsErrors.map(({key, message}) => `\t${key}: ${message}`).join("\n")
            throw new ValidationError(`Object props validation error:\n${fieldsMessage}\n`)
        }
        return typedVal as T
    }
}
