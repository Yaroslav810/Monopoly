class Orders {
    readonly gameId: string;
    readonly creationDate: Date;

    constructor(gameId: string) {
        this.gameId = gameId
        this.creationDate = new Date()
    }
}

export function initOrdersProvider() {
    const TIMER_TIME = 1000 * 60 * 15
    const storage = new Map<string, Orders>()

    const _start = (gameId: string): Orders => {
        const orders = new Orders(gameId)
        storage.set(gameId, orders)
        _initOrdersTimer(gameId)

        return orders
    }

    const _delete = (gameId: string) => {
        const orders = storage.get(gameId)
        if (!orders) {
            return
        }

        storage.delete(gameId)

        // Дальнейшие вызовы методов обработки
        // действий с приказами: постройка ЖД, аукционы и т.д.
    }

    const _getOrder = (gameId: string): Orders | null => {
        const orders = storage.get(gameId)
        return orders ?? null
    }

    const _initOrdersTimer = (gameId: string) => {
        setTimeout(() => _delete(gameId), TIMER_TIME)
    }

    return {
        start(gameId: string): Orders {
            return _start(gameId)
        },
        delete(gameId: string) {
            _delete(gameId)
        },
        getOrders(gameId: string): Orders | null {
            return _getOrder(gameId)
        },
        getRemainingTimeInMs(gameId: string): number {
            let remainingTime = 0
            const orders = storage.get(gameId)
            if (orders) {
                const now = new Date()
                remainingTime = TIMER_TIME - (now.getTime() - orders.creationDate.getTime())
            }

            return remainingTime
        }
    }
}
