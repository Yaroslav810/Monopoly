import {RoleStateHolder} from "../../model/Player";

class PlayerState {
    private players = new Map<string, RoleStateHolder>()

    constructor(players: RoleStateHolder[]) {
        players.forEach(player => {
            this.players.set(player.getPlayerId(), player)
        })
    }

    getPlayers(): RoleStateHolder[] {
        const players: Array<RoleStateHolder> = []
        this.players.forEach(player => {
            players.push(player)
        })

        return players
    }

    updatePlayer(playerId: string, data: RoleStateHolder): RoleStateHolder {
        this.players.set(playerId, data)

        return this.players.get(playerId) as RoleStateHolder
    }
}

class TempPlayerRepository {
    private storage = new Map<string, PlayerState>()

    initPlayersStateStorage(gameId: string, players: RoleStateHolder[]): void {
        this.clearState(gameId)
        this.storage.set(gameId, new PlayerState(players))
    }

    getPlayerByGameIdAndPlayerId(gameId: string, playerId: string): RoleStateHolder | null {
        const players = this.getStateByGameId(gameId)
        if (!players) {
            return null
        }

        return players
            .find(player => player.getPlayerId() === playerId) ?? null
    }

    getStateByGameId(gameId: string): RoleStateHolder[] | null {
        const state = this.storage.get(gameId)
        if (!state) {
            return null
        }

        return state.getPlayers()
    }

    updatePlayerState(gameId: string, playerId: string, data: RoleStateHolder): RoleStateHolder | null {
        const state = this.storage.get(gameId)
        if (!state) {
            return null
        }

        return state.updatePlayer(playerId, data)
    }

    clearState(gameId: string) {
        if (this.storage.get(gameId)) {
            this.storage.delete(gameId)
        }
    }
}

const tempPlayer = new TempPlayerRepository()

export type { TempPlayerRepository }

export function tempPlayerRepository(): TempPlayerRepository {
    return tempPlayer
}
