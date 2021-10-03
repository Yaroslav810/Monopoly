import {Squad, initOrderToMovingArmyProvider} from "./politicianOrders/movingArmy"
import {PrCampaign, initOrderToPrCampaignProvider} from "./politicianOrders/prCampaign"
import {RailwayConstruction, initOrderToRailwayConstructionProvider} from "./politicianOrders/railwayConstruction"
import {WarehouseConstruction, initOrderToWarehouseConstructionProvider} from "./politicianOrders/warehouseConstruction"
import {BuyingOrders, initOrderToBuyingOrdersProvider} from "./politicianOrders/buyingOrders"
import {Negotiations, initOrderToNegotiationsWithIndiansProvider} from "./politicianOrders/negotiationsWithIndians"
import {Order} from "./Order"
import {OrderType} from "../../../constants/OrderType";
import {Politician} from "../../Politician";

class Orders {
    storage: Order[]
    current: Order[]

    constructor() {
        this.storage = []
        this.current = []
    }

    addToStorage(order: Order) {
        this.storage.push(order)
    }

    addToCurrent(order: Order) {
        this.current.push(order)
    }
}

export function initOrdersProvider() {
    const storage = new Map<string, Orders>()

    const orderToBuyingOrders = initOrderToBuyingOrdersProvider()
    const orderToNegotiationsWithIndians = initOrderToNegotiationsWithIndiansProvider()
    const orderToWarehouseConstruction = initOrderToWarehouseConstructionProvider()
    const orderToRailwayConstruction = initOrderToRailwayConstructionProvider()
    const orderToPrCampaign = initOrderToPrCampaignProvider()
    const orderToMovingArmy = initOrderToMovingArmyProvider()

    const _addOrderToStorageList = (gameId: string, order: Order): Order | null => {
        const orders = storage.get(gameId)
        if (!orders) {
            return null
        }

        orders.addToStorage(order)
        return order
    }

    const _addOrderToCurrentList = (gameId: string, order: Order): Order | null => {
        const orders = storage.get(gameId)
        if (!orders) {
            return null
        }

        orders.addToCurrent(order)
        return order
    }

    const _executeOrders = (orders: Order[]) => {
        // Отследить конфликты, так как после выполняется
        // всё подряд

        sortOrdersByPriority(orders)
            .forEach(order => {
                order.execute()
            })
    }

    const sortOrdersByPriority = (orders: Array<Order>): Array<Order> => {
        const priority = [
            OrderType.RAILWAY_CONSTRUCTION,
            OrderType.TRADING,
            OrderType.MOVEMENT_OF_DETACHMENTS,
            OrderType.DEPLOYMENT_OF_INDIAN_TROOPS,
            OrderType.ATTACK_OF_INDIAN_TROOPS,
            OrderType.DESTRUCTION_OF_STATIONS,
            OrderType.DESTRUCTION_OF_INDIAN_SETTLEMENTS,
            OrderType.EXHIBITING_INDIAN_REVENGE,
            OrderType.RESTORATION_OF_INDIAN_SETTLEMENTS,
            OrderType.DEPLOYMENT_OF_NEW_DETACHMENTS_OF_RAILWAY_SECURITY,
            OrderType.CHANGING_IMPACT_OF_PR,
            OrderType.CHANGING_IMPACT_FROM_ROADS,
            OrderType.CHANGING_POLITICAL_AFFILIATION_OF_CITIES,
            OrderType.DISTRIBUTION_OF_INFLUENCE_OF_POLITICIANS_IN_CITIES,
            OrderType.RESTORATION_OF_LOST_ARMIES,
            OrderType.PURCHASE_OF_NEW_ORDERS
        ]

        orders.sort((a, b) => {
            const indexA = priority.indexOf(a.type)
            const indexB = priority.indexOf(b.type)

            return (!~indexA || !~indexB)
                ? indexB - indexA
                : indexA - indexB
        })

        return orders
    }

    return {
        initOrdersStorage(gameId: string) {
            storage.set(gameId, new Orders())
        },
        getOrders(gameId: string): Orders | null {
            return storage.get(gameId) ?? null
        },
        createOrderToMovementArmy(gameId: string, playerId: string, order: Squad[], politician: Politician): Order | null {
            const newOrder = orderToMovingArmy.create(playerId, order, politician)
            if (!newOrder) {
                return null
            }

            return _addOrderToStorageList(gameId, newOrder)
        },
        createOrderToPrCampaign(gameId: string, playerId: string, order: PrCampaign, politician: Politician): Order | null {
            const newOrder = orderToPrCampaign.create(playerId, order, politician)
            if (!newOrder) {
                return null
            }

            return _addOrderToStorageList(gameId, newOrder)
        },
        createOrderToConstructionRailway(gameId: string, playerId: string, order: RailwayConstruction, politician: Politician): Order | null {
            const newOrder = orderToRailwayConstruction.create(playerId, order, politician)
            if (!newOrder) {
                return null
            }

            return _addOrderToCurrentList(gameId, newOrder)
        },
        createOrderToConstructionWarehouse(gameId: string, playerId: string, order: WarehouseConstruction, politician: Politician): Order | null {
            const newOrder = orderToWarehouseConstruction.create(playerId, order, politician)
            if (!newOrder) {
                return null
            }

            return _addOrderToCurrentList(gameId, newOrder)
        },
        createOrderToNegotiationsWithIndians(gameId: string, playerId: string, order: Negotiations, politician: Politician): Order | null {
            const newOrder = orderToNegotiationsWithIndians.create(playerId, order, politician)
            if (!newOrder) {
                return null
            }

            return _addOrderToStorageList(gameId, newOrder)
        },
        createOrderToBuyingOrders(gameId: string, playerId: string, order: BuyingOrders, politician: Politician): Order | null {
            const newOrder = orderToBuyingOrders.create(playerId, order, politician)
            if (!newOrder) {
                return null
            }

            return _addOrderToStorageList(gameId, newOrder)
        },
        executeOrders(gameId: string): void {
            const orders = storage.get(gameId)
            if (!orders) {
                return
            }

            _executeOrders(orders.storage)
        }
    }
}
