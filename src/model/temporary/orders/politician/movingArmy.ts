import {PoliticianOrder} from "./politicianOrder"
import {Logger} from "../../../../../core/Logger"
import {OrderType} from "../../../../constants/OrderType"
import {Politician} from "../../../Politician"

export interface Squad {
    movementFrom: string
    movementTo: string
    numberSquads: number
    isAttack: boolean
}

class MovingArmyPoliticalOrder implements PoliticianOrder {
    type = OrderType.MOVEMENT_OF_DETACHMENTS
    playerId

    squads: Squad[]

    constructor(playerId: string, squads: Squad[]) {
        this.playerId = playerId
        this.squads = squads
    }

    execute() {
        this.squads.forEach(squad => {
            Logger.log(`Армия двигается с ${squad.movementFrom} до ${squad.movementTo}`)
        })
    }
}

export function initOrderToMovingArmyProvider() {
    return {
        create(playerId: string, order: Squad[], politician: Politician): MovingArmyPoliticalOrder | null {
            const numberMovementArmyBlanks = 1

            if (numberMovementArmyBlanks > politician.getNumberMovementArmyBlanks()) {
                return null
            }

            politician.changeNumberMovementArmyBlanks(-numberMovementArmyBlanks)

            return new MovingArmyPoliticalOrder(playerId, order)
        }
    }
}
