import {Order} from "../../model/orders/Order"

class Orders {
    private readonly storage: Order[]
    private readonly current: Order[]

    constructor() {
        this.storage = []
        this.current = []
    }

    getStorage(): Order[] {
        return this.storage
    }

    getCurrent(): Order[] {
        return this.current
    }

    addToStorage(order: Order) {
        this.storage.push(order)
    }

    addToCurrent(order: Order) {
        this.current.push(order)
    }
}

class OrdersRepository {
    private storage = new Map<string, Orders>()

    initOrdersStorage(gameId: string) {
        this.storage.set(gameId, new Orders())
    }

    clearOrderStorage(gameId: string) {
        this.storage.delete(gameId)
    }

    getOrders(gameId: string): Orders | null {
        return this.storage.get(gameId) ?? null
    }

    addOrderToStorageList(gameId: string, order: Order): Order | null {
        const orders = this.storage.get(gameId)
        if (!orders) {
            return null
        }

        orders.addToStorage(order)
        return order
    }

    addOrderToCurrentList(gameId: string, order: Order): Order | null {
        const orders = this.storage.get(gameId)
        if (!orders) {
            return null
        }

        orders.addToCurrent(order)
        return order
    }

    // private readonly orderToBuyingOrders = initOrderToBuyingOrdersProvider()
    // private readonly orderToNegotiationsWithIndians = initOrderToNegotiationsWithIndiansProvider()
    // private readonly orderToWarehouseConstruction = initOrderToWarehouseConstructionProvider()
    // private readonly orderToRailwayConstruction = initOrderToRailwayConstructionProvider()
    // private readonly orderToPrCampaign = initOrderToPrCampaignProvider()
    // private readonly orderToMovingArmy = initOrderToMovingArmyProvider()

    // createOrderToMovementArmy(gameId: string, playerId: string, order: Squad[], politician: Politician): Order | null {
    //     const newOrder = this.orderToMovingArmy.create(playerId, order, politician)
    //     if (!newOrder) {
    //         return null
    //     }
    //
    //     return this.addOrderToStorageList(gameId, newOrder)
    // }
    //
    // createOrderToPrCampaign(gameId: string, playerId: string, order: PrCampaign, politician: Politician): Order | null {
    //     const newOrder = this.orderToPrCampaign.create(playerId, order, politician)
    //     if (!newOrder) {
    //         return null
    //     }
    //
    //     return this.addOrderToStorageList(gameId, newOrder)
    // }
    //
    // createOrderToConstructionRailway(gameId: string, playerId: string, order: RailwayConstruction, politician: Politician): Order | null {
    //     const newOrder = this.orderToRailwayConstruction.create(playerId, order, politician)
    //     if (!newOrder) {
    //         return null
    //     }
    //
    //     return this.addOrderToCurrentList(gameId, newOrder)
    // }
    //
    // createOrderToConstructionWarehouse(gameId: string, playerId: string, order: WarehouseConstruction, politician: Politician): Order | null {
    //     const newOrder = this.orderToWarehouseConstruction.create(playerId, order, politician)
    //     if (!newOrder) {
    //         return null
    //     }
    //
    //     return this.addOrderToCurrentList(gameId, newOrder)
    // }
    //
    // createOrderToNegotiationsWithIndians(gameId: string, playerId: string, order: Negotiations, politician: Politician): Order | null {
    //     const newOrder = this.orderToNegotiationsWithIndians.create(playerId, order, politician)
    //     if (!newOrder) {
    //         return null
    //     }
    //
    //     return this.addOrderToStorageList(gameId, newOrder)
    // }
    //
    // createOrderToBuyingOrders(gameId: string, playerId: string, order: BuyingOrders, politician: Politician): Order | null {
    //     const newOrder = this.orderToBuyingOrders.create(playerId, order, politician)
    //     if (!newOrder) {
    //         return null
    //     }
    //
    //     return this.addOrderToStorageList(gameId, newOrder)
    // }
}

const orders = new OrdersRepository()

export type {OrdersRepository}

export function ordersRepository(): OrdersRepository {
    return orders
}
