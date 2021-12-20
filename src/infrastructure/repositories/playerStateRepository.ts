import {DbContext} from "../dbContext/context"
import {PlayerState} from "./mappers/entities/PlayerState"
import {BaseRepository} from "./baseRepository"
import {MapToPlayerState} from "./mappers/mapper"

class PlayerStateRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getPlayerStateById(id: string): Promise<PlayerState | null> {
        const playerState = await this.dbContext.playerState.findByPk(id)
        return playerState ? MapToPlayerState(playerState) : null
    }
}

export type {PlayerStateRepository}

export function initPlayerStateRepository(dbContext: DbContext) {
    return new PlayerStateRepository(dbContext)
}
