import {PlayerRole} from "../Player"

class State {
    players = new Map<string, PlayerRole>()

    constructor(players: PlayerRole[]) {
        players.forEach(player => {
            this.players.set(player.getPlayerId(), player)
        })
    }

    getPlayers(): PlayerRole[] {
        const players: Array<PlayerRole> = []
        this.players.forEach(player => {
            players.push(player)
        })

        return players
    }

    updatePlayer(playerId: string, data: PlayerRole): PlayerRole {
        this.players.set(playerId, data)

        return this.players.get(playerId) as PlayerRole
    }
}

export function initPlayersStateProvider() {
    const storage = new Map<string, State>()

    return {
        initPlayersStateStorage(gameId: string, players: PlayerRole[]): State {
            this.clearState(gameId)
            const state = new State(players)
            storage.set(gameId, state)

            return state
        },
        getPlayerByGameIdAndPlayerId(gameId: string, playerId: string): PlayerRole | null {
            const players = this.getStateByGameId(gameId)
            if (!players) {
                return null
            }

            return players
                .find(player => player.getPlayerId() === playerId) ?? null
        },
        getStateByGameId(gameId: string): PlayerRole[] | null {
            const state = storage.get(gameId)
            if (!state) {
                return null
            }

            return state.getPlayers()
        },
        updatePlayerState(gameId: string, playerId: string, data: PlayerRole): PlayerRole | null {
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
