import {v4} from "uuid"

export function generateUUId(): string {
    return v4()
        .replace(/-/g, "")
        .toString()
}
