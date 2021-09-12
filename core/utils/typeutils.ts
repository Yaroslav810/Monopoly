export function nullable<T>(item: T|undefined): T|null {
    return item === undefined ? null : item
}
