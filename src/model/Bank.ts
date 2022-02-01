import {PlayerStateRepository} from "../infrastructure/repositories/playerStateRepository"
import {PropertyRepository} from "../infrastructure/repositories/propertyRepository"
import {GameData} from "../constants/Game/GameData"
import {PlayerStateStatus} from "../infrastructure/configurations/PlayerState"

export interface IBankProvider {
    canPlayerBuyProperty(playerId: string): Promise<boolean>
    buyProperty(playerId: string): Promise<void>
}

export function initBankProvider(
    playerStateRepository: PlayerStateRepository,
    propertyRepository: PropertyRepository
) {
    return new class BankProvider implements IBankProvider {
        async canPlayerBuyProperty(playerId: string): Promise<boolean> {
            const playerState = await playerStateRepository.getPlayerStateByPlayerId(playerId)
            if (!playerState) {
                return false
            }

            if (playerState.getState() !== PlayerStateStatus.ACTIVE || !playerState.getPositionOnMap()) {
                return false
            }

            const properties = await propertyRepository.getPropertiesByPlayerId(playerId)
            const property = GameData.PROPERTY.find(p => p.mapFieldId === playerState.getPositionOnMap())
            if (!property) {
                return false
            }

            if (playerState.getAmountMoney() < property.buy) {
                return false
            }

            return !properties.some(data => data.getPropertyId() === property.id)
        }

        async buyProperty(playerId: string): Promise<void> {
            const playerState = await playerStateRepository.getPlayerStateByPlayerId(playerId)
            if (!playerState || playerState.getState() !== PlayerStateStatus.ACTIVE) {
                return
            }

            const gameDataProperty = GameData.PROPERTY.find(p => p.mapFieldId === playerState.getPositionOnMap())
            if (!gameDataProperty) {
                return
            }

            playerState.setAmountMoney(playerState.getAmountMoney() - gameDataProperty.buy)

            await Promise.all([
                playerStateRepository.updatePlayerState(playerState),
                propertyRepository.createProperty(playerId, gameDataProperty.id)
            ])
        }
    }
}
