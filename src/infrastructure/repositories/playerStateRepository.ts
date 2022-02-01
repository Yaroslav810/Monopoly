import {DbContext} from "../dbContext/context"
import {PlayerState} from "./mappers/entities/PlayerState"
import {BaseRepository} from "./baseRepository"
import {MapToPlayerState} from "./mappers/mapper"
import {generateUUId} from "../../../core/utils/UUIDUtils"
import {PlayerStateStatus} from "../configurations/PlayerState"
import {GameData, MapField} from "../../constants/Game/GameData"

class PlayerStateRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async createPlayerState(playerId: string, amountMoney: number, state: PlayerStateStatus) {
        return MapToPlayerState(
            await this.dbContext.playerState.create({
                id: generateUUId(),
                playerId: playerId,
                amountMoney: amountMoney,
                state: state,
                positionOnMap: (GameData.MAP[0] as MapField).id,
                hasRollDice: false
            })
        )
    }

    async getPlayerStateById(id: string): Promise<PlayerState | null> {
        const playerState = await this.dbContext.playerState.findByPk(id)
        return playerState ? MapToPlayerState(playerState) : null
    }

    async getPlayerStateByPlayerId(playerId: string): Promise<PlayerState | null> {
        const playerState = await this.dbContext.playerState.findOne({
            where: {
                playerId: playerId
            }
        })
        return playerState ? MapToPlayerState(playerState) : null
    }

    async updatePlayerState(playerState: PlayerState): Promise<void> {
        await this.dbContext.playerState.update({
            amountMoney: playerState.getAmountMoney(),
            state: playerState.getState(),
            positionOnMap: playerState.getPositionOnMap(),
            hasRollDice: playerState.getHasRollDice()
        }, {
            where: {
                id: playerState.getId()
            }
        })
    }
}

export type {PlayerStateRepository}

export function initPlayerStateRepository(dbContext: DbContext) {
    return new PlayerStateRepository(dbContext)
}
