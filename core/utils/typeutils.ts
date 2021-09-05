export function nullable<T>(item: T|undefined): T|null {
	return item === undefined ? null : item;
}

export function verify<T>(item: T|null|undefined): NonNullable<T> {
	if (item != null) {
		return item as NonNullable<T>
	}
	throw new Error(`item is ${item}`)
}