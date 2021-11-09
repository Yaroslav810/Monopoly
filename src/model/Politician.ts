import {RoleStateHolder} from "./Player"
import {PlayerRepository} from "../infrastructure/repositories/playerRepository";
import {Politician} from "./entities/Politician";

export function initPoliticianProvider(playerRepository: PlayerRepository) {
    return {
        create(playerId: string): Promise<Politician> {
            return playerRepository.createPolitician(playerId)
        },
        delete(playerId: string): Promise<void> {
            return playerRepository.deletePolitician(playerId)
        },
        update(politician: Politician): Promise<void> {
            return playerRepository.updatePolitician(politician)
        },
        getByPlayerId(playerId: string): Promise<Politician | null> {
            return playerRepository.getPoliticianByPlayerId(playerId)
        },
        async addBudgetUnits(politicianId: string, quantity: number): Promise<void> {
            const politician = await playerRepository.getPoliticianById(politicianId)
            if (!politician) {
                return
            }

            politician.changeBudgetUnits(quantity)
            await playerRepository.updatePolitician(politician)
        },
        isPolitician(player: RoleStateHolder): player is Politician {
            return player && player instanceof Politician
        }
    }
}
