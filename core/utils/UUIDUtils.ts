import {v4} from "uuid";

export function generateUUId(): string {
	return v4().toString().replace(/-/g, '');
}