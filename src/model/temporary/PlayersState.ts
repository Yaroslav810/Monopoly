import {RoleStateHolder} from "../Player"

class State {
    players = new Map<string, RoleStateHolder>()

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

export function initPlayersStateProvider() {
    const storage = new Map<string, State>()

    return {
        initPlayersStateStorage(gameId: string, players: RoleStateHolder[]): State {
            this.clearState(gameId)
            const state = new State(players)
            storage.set(gameId, state)

            return state
        },
        getPlayerByGameIdAndPlayerId(gameId: string, playerId: string): RoleStateHolder | null {
            const players = this.getStateByGameId(gameId)
            if (!players) {
                return null
            }

            return players
                .find(player => player.getPlayerId() === playerId) ?? null
        },
        getStateByGameId(gameId: string): RoleStateHolder[] | null {
            const state = storage.get(gameId)
            if (!state) {
                return null
            }

            return state.getPlayers()
        },
        updatePlayerState(gameId: string, playerId: string, data: RoleStateHolder): RoleStateHolder | null {
            const state = storage.get(gameId)
            if (!state) {
                return null
            }

            return state.updatePlayer(playerId, data)
        },
        clearState(gameId: string) {
            if (storage.get(gameId)) {
                storage.delete(gameId)
            }
        }
    }
}
