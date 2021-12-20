import * as events from "events"

const emitter = new events.EventEmitter()

export enum Event {
    START_GAME = "startGame"
}

export interface IEventBindingProvider {
    initStartGameEvent(): Promise<void>
    executeStartGameEvent(): void
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
}

export function initEventBindingProvider() {
    return new EventBindingProvider()
}
