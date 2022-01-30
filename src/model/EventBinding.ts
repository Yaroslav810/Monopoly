import * as events from "events"

const emitter = new events.EventEmitter()

export enum Event {
    START_GAME = "startGame",
    GAME_PROGRESS = "gameProgress"
}

export interface IEventBindingProvider {
    initStartGameEvent(): Promise<void>
    executeStartGameEvent(): void
    initGameProgressEvent(): Promise<void>
    executeGameProgressEvent(): void
}

class EventBindingProvider implements IEventBindingProvider {
    async initStartGameEvent(): Promise<void> {
        return new Promise<void>(resolve => {
            emitter.once(Event.START_GAME, () => {
                resolve()
            })
        })
    }
    executeStartGameEvent(): void {
        emitter.emit(Event.START_GAME)
    }

    async initGameProgressEvent(): Promise<void> {
        return new Promise<void>(resolve => {
            emitter.once(Event.GAME_PROGRESS, () => {
                resolve()
            })
        })
    }
    executeGameProgressEvent(): void {
        emitter.emit(Event.GAME_PROGRESS)
    }
}

export function initEventBindingProvider() {
    return new EventBindingProvider()
}
