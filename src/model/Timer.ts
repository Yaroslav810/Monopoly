export function initTimerProvider() {

    const TIMER_TIME = 1000 * 60 * 15
    const storage = new Map<string, Date>()

    const _initTimer = (gameId: string) => {
        return new Promise<void>(resolve => {
            setTimeout(() => {
                _delete(gameId)
                resolve()
            }, TIMER_TIME)
        })
    }

    const _delete = (gameId: string) => {
        if (storage.get(gameId)) {
            storage.delete(gameId)
        }
    }

    return {
        async start(gameId: string) {
            if (storage.get(gameId)) {
                storage.delete(gameId)
            }

            storage.set(gameId, new Date())
            return await _initTimer(gameId)
        },
        delete(gameId: string) {
            _delete(gameId)
        },
        getRemainingTimeInMs(gameId: string): number {
            let remainingTime = 0
            const creationDate = storage.get(gameId)
            if (creationDate) {
                const now = new Date()
                remainingTime = TIMER_TIME - (now.getTime() - creationDate.getTime())
            }

            return remainingTime
        }
    }
}
