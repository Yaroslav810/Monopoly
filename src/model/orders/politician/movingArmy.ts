import {PoliticianOrder} from "./politicianOrder"
import {OrderType} from "../../../constants/OrderType"
import {Logger} from "../../../../core/Logger"

export interface Squad {
    movementFrom: string
    movementTo: string
    numberSquads: number
    isAttack: boolean
}

class MovingArmyPoliticalOrder implements PoliticianOrder {
    private readonly type = OrderType.MOVEMENT_OF_DETACHMENTS
    private readonly playerId
    private readonly squads: Squad[]

    constructor(playerId: string, squads: Squad[]) {
        this.playerId = playerId
        this.squads = squads
    }

    getType(): OrderType {
        return this.type
    }

    getPlayerId(): string {
        return this.playerId
    }

    execute() {
        this.squads.forEach(squad => {
            Logger.log(`Армия двигается с ${squad.movementFrom} до ${squad.movementTo}`)
        })
    }
}

export function initOrderToMovingArmyProvider() {
    return {
        create(playerId: string, order: Squad[]): MovingArmyPoliticalOrder {
            return new MovingArmyPoliticalOrder(playerId, order)
        }
    }
}
