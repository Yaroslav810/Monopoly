import {DbContext} from "../dbContext/context"
import {PlayerState} from "../../model/entities/PlayerState"
import {BaseRepository} from "./baseRepository"
import {MapToPlayerState} from "./mappers/mapper"

export class PlayerStateRepository extends BaseRepository {
    constructor(dbContext: DbContext) {
        super(dbContext)
    }

    async getPlayerStateById(id: string): Promise<PlayerState | null> {
        const playerState = await this.dbContext.playerState.findByPk(id)
        return playerState ? MapToPlayerState(playerState) : null
    }
}
