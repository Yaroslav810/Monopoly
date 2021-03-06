class Timer {
    private storage = new Map<string, Date>()
    private readonly TIMER_TIME = 1000 * 60 * 15

    async start(gameId: string) {
        if (this.storage.get(gameId)) {
            this.storage.delete(gameId)
        }

        this.storage.set(gameId, new Date())
        return await this.initTimer(gameId)
    }

    delete(gameId: string) {
        if (this.storage.get(gameId)) {
            this.storage.delete(gameId)
        }
    }

    getRemainingTimeInMs(gameId: string): number {
        let remainingTime = 0
        const creationDate = this.storage.get(gameId)
        if (creationDate) {
            const now = new Date()
            remainingTime = this.TIMER_TIME - (now.getTime() - creationDate.getTime())
        }

        return remainingTime
    }

    private initTimer(gameId: string) {
        return new Promise<number>(resolve => {
            setTimeout(() => {
                this.delete(gameId)
                resolve(this.TIMER_TIME)
            }, this.TIMER_TIME)
        })
    }
}

export type {Timer}

export function initTimer(): Timer {
    return new Timer()
}
