import {Action} from "../../../_common/Action"
import {CreateOrderToBuyingOrders} from "../../schemes"
import {ResponseStatus} from "../../../../constants/ResponseStatus"
import {verifyTeam, verifyTimer, verifyUserAccess} from "../../../_common/checks"
import {Team} from "../../../../constants/Team"
import {verifyExisting} from "../../../../../core/http/httputils"

const calculateCost = (order: Record<string, unknown>): number => {
    const sumArithmeticProgression = (num: number): number => {
        const initialCost = 10
        const increasingCost = 10

        return (2 * initialCost + increasingCost * (num - 1)) / 2 * num
    }

    let count = 0
    Object.values(order).forEach(number => {
        count += sumArithmeticProgression(number as number)
    })

    return count
}

export const createOrderToBuyingOrders: Action<typeof CreateOrderToBuyingOrders> = async ({dataProvider}, _, {playerToken, order}) => {
    const politician = verifyUserAccess(await dataProvider.player.getPlayerById(playerToken))
    verifyTeam(politician.team, [ Team.FEDERATION, Team.CONFEDERATION, Team.REPUBLIC ])
    verifyTimer(dataProvider.timer.getRemainingTimeInMs(politician.gameId))

    const player = verifyExisting(dataProvider.playersState.getPlayerByGameIdAndPlayerId(politician.gameId, politician.id))
    const cost = calculateCost(order)
    if (player.numberNewBlanks && (cost <= player.budgetUnits)) {
        verifyExisting(dataProvider.orders.createOrderToBuyingOrders(politician.gameId, politician.id, order))

        player.numberNewBlanks--
        player.budgetUnits -= cost
        dataProvider.playersState.updatePlayerState(politician.gameId, politician.id, player)

        return {
            status: ResponseStatus.OK
        }
    }

    return {
        status: ResponseStatus.NOT_ENOUGH_RESOURCES
    }
}
