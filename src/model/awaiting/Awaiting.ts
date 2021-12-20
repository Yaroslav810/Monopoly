import {initStartGameAwaiting} from "./StartGameAwaiting"

class Awaiting {
    readonly startGameAwaiting = initStartGameAwaiting()
}

export type {Awaiting}

export function initAwaiting() {
    return new Awaiting()
}
