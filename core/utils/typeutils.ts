export function nullable<T>(item: T|undefined): T|null {
    return item === undefined ? null : item
}

export function notEmpty<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined
}
