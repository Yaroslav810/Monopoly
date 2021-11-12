import {Order} from "./orders/Order"
import {OrderType} from "../constants/OrderType"
import {initOrderToMovingArmyProvider, Squad} from "./orders/politician/movingArmy"

import {BuyingOrders, initOrderToBuyingOrdersProvider} from "./orders/politician/buyingOrders"
import {
    initOrderToNegotiationsWithIndiansProvider,
    Negotiations
} from "./orders/politician/negotiationsWithIndians"
import {
    initOrderToWarehouseConstructionProvider,
    WarehouseConstruction
} from "./orders/politician/warehouseConstruction"
import {
    initOrderToRailwayConstructionProvider,
    RailwayConstruction
} from "./orders/politician/railwayConstruction"
import {initOrderToPrCampaignProvider, PrCampaign} from "./orders/politician/prCampaign"

import {OrdersRepository} from "../infrastructure/repositories/ordersRepository"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository"
import {TempPlayerRepository} from "../infrastructure/repositories/tempPlayerRepository"
import {RoleStateHolder} from "./Player"
import {notEmpty} from "../../core/utils/typeutils"

export interface IOrderProvider {
    createOrderToMovementArmy(gameId: string, playerId: string, order: Squad[]): Order | null
    createOrderToPrCampaign(gameId: string, playerId: string, order: PrCampaign): Order | null
    createOrderToConstructionRailway(gameId: string, playerId: string, order: RailwayConstruction): Order | null
    createOrderToConstructionWarehouse(gameId: string, playerId: string, order: WarehouseConstruction): Order | null
    createOrderToNegotiationsWithIndians(gameId: string, playerId: string, order: Negotiations): Order | null
    createOrderToBuyingOrders(gameId: string, playerId: string, order: BuyingOrders): Order | null
    executeOrders(gameId: string): void
    saveState(gameId: string): Promise<void>
    commitState(gameId: string): Promise<void>
    initOrderStorage(gameId: string): void
    clearOrderStorage(gameId: string): void
}

export function initOrderProvider(
    ordersRepository: OrdersRepository,
    playerRepository: PlayerRepository,
    tempPlayerRepository: TempPlayerRepository
) {
    const orderToBuyingOrders = initOrderToBuyingOrdersProvider()
    const orderToNegotiationsWithIndians = initOrderToNegotiationsWithIndiansProvider()
    const orderToWarehouseConstruction = initOrderToWarehouseConstructionProvider()
    const orderToRailwayConstruction = initOrderToRailwayConstructionProvider()
    const orderToPrCampaign = initOrderToPrCampaignProvider()
    const orderToMovingArmy = initOrderToMovingArmyProvider()

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

        const result = orders.slice()
        result.sort((a, b) => {
            const indexA = priority.indexOf(a.getType())
            const indexB = priority.indexOf(b.getType())

            return (!~indexA || !~indexB)
                ? indexB - indexA
                : indexA - indexB
        })

        return result
    }

    const sumArithmeticProgression = (num: number): number => {
        const initialCost = 10
        const increasingCost = 10

        return (2 * initialCost + increasingCost * (num - 1)) / 2 * num
    }

    const calculateCostBuyingOrders = (order: BuyingOrders): number => {
        let count = 0
        Object.values(order)
            .forEach(number => {
                count += sumArithmeticProgression(number as number)
            })

        return count
    }

    const getTeamsOfPlayers = async (gameId: string): Promise<RoleStateHolder[]> => {
        const players = await playerRepository.getPlayersByGameId(gameId)

        const teamsInfo = []
        for (const player of players) {
            teamsInfo.push(playerRepository.getTeam(player))
        }

        return (await Promise.all(teamsInfo)).filter(notEmpty)
    }

    const preparePoliticianToOrderStep = (player: RoleStateHolder): void => {
        player.setNumberMovementArmyBlanks(1)
        player.setNumberNewBlanks(1)
    }

    const preparePlayerToOrderStep = (players: RoleStateHolder[]): void => {
        players.forEach(player => {
            // Todo: Реализовать свой prepare для разных ролей
            preparePoliticianToOrderStep(player)
        })
    }

    const addRevenueToPlayer = (player: RoleStateHolder): void => {
        player.changeBudgetUnits(15)
    }

    return new class implements IOrderProvider {
        createOrderToMovementArmy(gameId: string, playerId: string, order: Squad[]): Order | null {
            const politician = tempPlayerRepository.getPlayerByGameIdAndPlayerId(gameId, playerId)
            if (!politician) {
                return null
            }

            const numberMovementArmyBlanks = 1
            if (numberMovementArmyBlanks > politician.getNumberMovementArmyBlanks()) {
                return null
            }

            const newOrder = orderToMovingArmy.create(playerId, order)
            politician.changeNumberMovementArmyBlanks(-numberMovementArmyBlanks)

            return ordersRepository.addOrderToStorageList(gameId, newOrder)
        }

        createOrderToPrCampaign(gameId: string, playerId: string, order: PrCampaign): Order | null {
            const politician = tempPlayerRepository.getPlayerByGameIdAndPlayerId(gameId, playerId)
            if (!politician) {
                return null
            }

            const numberPrBlanks = 1
            if (numberPrBlanks > politician.getNumberPrBlanks()) {
                return null
            }

            const newOrder = orderToPrCampaign.create(playerId, order)
            politician.changeNumberPrBlanks(-numberPrBlanks)

            return ordersRepository.addOrderToStorageList(gameId, newOrder)
        }

        createOrderToConstructionRailway(gameId: string, playerId: string, order: RailwayConstruction): Order | null {
            const politician = tempPlayerRepository.getPlayerByGameIdAndPlayerId(gameId, playerId)
            if (!politician) {
                return null
            }

            const numberRailwayConstructionBlanks = 1
            if (numberRailwayConstructionBlanks > politician.getNumberRailwayConstructionBlanks()) {
                return null
            }

            const newOrder = orderToRailwayConstruction.create(playerId, order)
            politician.changeNumberRailwayConstructionBlanks(-numberRailwayConstructionBlanks)

            return ordersRepository.addOrderToCurrentList(gameId, newOrder)
        }

        createOrderToConstructionWarehouse(gameId: string, playerId: string, order: WarehouseConstruction): Order | null {
            const politician = tempPlayerRepository.getPlayerByGameIdAndPlayerId(gameId, playerId)
            if (!politician) {
                return null
            }

            const numberWarehouseConstructionBlanks = 1
            if (numberWarehouseConstructionBlanks > politician.getNumberWarehouseConstructionBlanks()) {
                return null
            }

            const newOrder = orderToWarehouseConstruction.create(playerId, order)
            politician.changeNumberWarehouseConstructionBlanks(-numberWarehouseConstructionBlanks)

            return ordersRepository.addOrderToCurrentList(gameId, newOrder)
        }

        createOrderToNegotiationsWithIndians(gameId: string, playerId: string, order: Negotiations): Order | null {
            const politician = tempPlayerRepository.getPlayerByGameIdAndPlayerId(gameId, playerId)
            if (!politician) {
                return null
            }

            const numberNegotiationsWithIndiansBlanks = 1
            if (numberNegotiationsWithIndiansBlanks > politician.getNumberNegotiationsWithIndiansBlanks()) {
                return null
            }

            const newOrder = orderToNegotiationsWithIndians.create(playerId, order)
            politician.changeNumberNegotiationsWithIndiansBlanks(-numberNegotiationsWithIndiansBlanks)

            return ordersRepository.addOrderToStorageList(gameId, newOrder)
        }

        createOrderToBuyingOrders(gameId: string, playerId: string, order: BuyingOrders): Order | null {
            const politician = tempPlayerRepository.getPlayerByGameIdAndPlayerId(gameId, playerId)
            if (!politician) {
                return null
            }

            const budgetUnits = calculateCostBuyingOrders(order)
            const numberNewBlanks = 1
            if (numberNewBlanks > politician.getNumberNewBlanks() || budgetUnits > politician.getBudgetUnits()) {
                return null
            }

            const newOrder = orderToBuyingOrders.create(playerId, order)
            politician.changeBudgetUnits(-budgetUnits)
            politician.changeNumberNewBlanks(-numberNewBlanks)

            return ordersRepository.addOrderToStorageList(gameId, newOrder)
        }

        executeOrders(gameId: string): void {
            const orders = ordersRepository.getOrders(gameId)
            if (!orders) {
                return
            }

            // Отследить конфликты, так как после выполняется
            // всё подряд
            sortOrdersByPriority(orders.getStorage())
                .forEach(order => {
                    order.execute()
                })
        }

        async saveState(gameId: string): Promise<void> {
            const players = await getTeamsOfPlayers(gameId)
            preparePlayerToOrderStep(players)
            tempPlayerRepository.initPlayersStateStorage(gameId, players)
        }

        async commitState(gameId: string): Promise<void> {
            const players = tempPlayerRepository.getStateByGameId(gameId)
            if (!players) {
                return
            }

            const updatePlayers = []
            for (const player of players) {
                // Todo: Реализовать для каждой роли
                addRevenueToPlayer(player)
                updatePlayers.push(playerRepository.updatePolitician(player))
            }
            await Promise.all(updatePlayers)
        }

        initOrderStorage(gameId: string): void {
            ordersRepository.initOrdersStorage(gameId)
        }

        clearOrderStorage(gameId: string): void {
            ordersRepository.clearOrderStorage(gameId)
        }
    }
}
