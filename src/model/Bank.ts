import {PlayerStateRepository} from "../infrastructure/repositories/playerStateRepository"
import {Player} from "../infrastructure/repositories/mappers/entities/Player"
import {PropertyRepository} from "../infrastructure/repositories/propertyRepository"

export interface IBankProvider {
    addStartingAmount(players: Player[]): Promise<void>
}

export function initBankProvider(
    _: PlayerStateRepository,
    __: PropertyRepository
) {
    return new class BankProvider implements IBankProvider {
        async addStartingAmount(_: Player[]): Promise<void> {}
    }
}
