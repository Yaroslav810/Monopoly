import {PriorityWarProcessing} from "../constants/PriorityWarProcessing"
import {PriorityPolicyProcessing} from "../constants/PriorityPolicyProcessing"

interface Order {
    priority: number
    playerId: string
    execute(): void
}

type PoliticianOrder = Order

interface Squad {
    movementFrom: string
    movementTo: string
    numberSquads: number
    isAttack: boolean
}

class MovingArmyPoliticalOrder implements PoliticianOrder {
    priority = PriorityWarProcessing.MOVEMENT_OF_DETACHMENTS
    squads: Squad[]
    playerId

    constructor(playerId: string, squads: Squad[]) {
        this.squads = squads
        this.playerId = playerId
    }

    execute() {}
}

class PRPoliticalOrder implements PoliticianOrder {
    priority = PriorityPolicyProcessing.CHANGING_IMPACT_OF_PR
    firstCity: string
    secondCity: string
    playerId

    constructor(playerId: string, order: {firstCity: string, secondCity: string}) {
        this.playerId = playerId
        this.firstCity = order.firstCity
        this.secondCity = order.secondCity
    }

    execute() {}
}

interface RailwayConstruction {
    railwayCompany: number
    constructionFrom: string
    constructionTo: string
    lengthOfRoad: number
}

class RailwayConstructionPoliticalOrder implements PoliticianOrder {
    priority = 0
    order: RailwayConstruction
    playerId

    constructor(playerId: string, order: RailwayConstruction) {
        this.playerId = playerId
        this.order = order
    }

    execute() {}
}

interface WarehouseConstruction {
    tradingCompany: number
    city: string
}

class WarehouseConstructionPoliticalOrder implements PoliticianOrder {
    priority = 0
    order: WarehouseConstruction
    playerId

    constructor(playerId: string, order: WarehouseConstruction) {
        this.playerId = playerId
        this.order = order
    }

    execute() {}
}

interface Negotiations {
    firstTerritory: string
    firstIsPeaceNegotiation: boolean
    secondTerritory: string
    secondIsPeaceNegotiation: boolean
}

class NegotiationsWithIndiansPoliticalOrder implements PoliticianOrder {
    priority = PriorityWarProcessing.DESTRUCTION_OF_INDIAN_SETTLEMENTS
    order: Negotiations
    playerId

    constructor(playerId: string, order: Negotiations) {
        this.playerId = playerId
        this.order = order
    }

    execute() {}
}

interface BuyingOrders {
    numberPrBlanks: number
    numberRailwayConstructionBlanks: number
    numberWarehouseConstructionBlanks: number
    numberNegotiationsWithIndiansBlanks: number
}

class BuyingOrdersPoliticalOrder implements PoliticianOrder {
    priority = 1
    order: BuyingOrders
    playerId

    constructor(playerId: string, order: BuyingOrders) {
        this.playerId = playerId
        this.order = order
    }

    execute() {}
}

class Orders {
    railwayConstruction: Order[]
    trading: Order[]
    war: Order[]
    politics: Order[]
    current: Order[]
    lastExecution: Order[]

    constructor() {
        this.railwayConstruction = []
        this.trading = []
        this.war = []
        this.politics = []
        this.current = []
        this.lastExecution = []
    }

    pushToRailwayConstruction(order: Order) {
        this.railwayConstruction.push(order)
    }

    pushToTrading(order: Order) {
        this.trading.push(order)
    }

    pushToWar(order: Order) {
        this.war.push(order)
    }

    pushToPolitics(order: Order) {
        this.politics.push(order)
    }

    pushToCurrent(order: Order) {
        this.current.push(order)
    }

    pushToLastExecution(order: Order) {
        this.lastExecution.push(order)
    }
}

export function initOrdersProvider() {
    const storage = new Map<string, Orders>()

    const _addOrderToWarList = (gameId: string, order: Order): Order | null => {
        const orders = storage.get(gameId)
        if (!orders) return null

        orders.pushToWar(order)
        return order
    }

    const _addOrderToPoliticsList = (gameId: string, order: Order): Order | null => {
        const orders = storage.get(gameId)
        if (!orders) return null

        orders.pushToPolitics(order)
        return order
    }

    const _addOrderToCurrentList = (gameId: string, order: Order): Order | null => {
        const orders = storage.get(gameId)
        if (!orders) return null

        orders.pushToCurrent(order)
        return order
    }

    const _addOrderToLastExecution = (gameId: string, order: Order): Order | null => {
        const orders = storage.get(gameId)
        if (!orders) return null

        orders.pushToLastExecution(order)
        return order
    }

    const _executeOrders = (gameId: string): void => {
        const orders = storage.get(gameId)
        if (!orders) return

        // Выполнение orders
    }

    return {
        initOrdersStorage(gameId: string) {
            storage.set(gameId, new Orders())
        },
        createOrderToMovementArmy(gameId: string, playerId: string, order: Squad[]): Order | null {
            const newOrder = new MovingArmyPoliticalOrder(playerId, order)
            return _addOrderToWarList(gameId, newOrder)
        },
        createOrderToPrCampaign(gameId: string, playerId: string, order: {firstCity: string, secondCity: string}): Order | null {
            const newOrder = new PRPoliticalOrder(playerId, order)
            return _addOrderToPoliticsList(gameId, newOrder)
        },
        createOrderToConstructionRailway(gameId: string, playerId: string, order: RailwayConstruction): Order | null {
            const newOrder = new RailwayConstructionPoliticalOrder(playerId, order)
            return _addOrderToCurrentList(gameId, newOrder)
        },
        createOrderToConstructionWarehouse(gameId: string, playerId: string, order: WarehouseConstruction): Order | null {
            const newOrder = new WarehouseConstructionPoliticalOrder(playerId, order)
            return _addOrderToCurrentList(gameId, newOrder)
        },
        createOrderToNegotiationsWithIndians(gameId: string, playerId: string, order: Negotiations): Order | null {
            const newOrder = new NegotiationsWithIndiansPoliticalOrder(playerId, order)
            return _addOrderToWarList(gameId, newOrder)
        },
        createOrderToBuyingOrders(gameId: string, playerId: string, order: BuyingOrders): Order | null {
            const newOrder = new BuyingOrdersPoliticalOrder(playerId, order)
            return _addOrderToLastExecution(gameId, newOrder)
        },
        executeOrders(gameId: string) {
            _executeOrders(gameId)
        }
    }
}
