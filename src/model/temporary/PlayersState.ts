import {PlayerType} from "../Player"

class State {
    players = new Map<string, PlayerType>()

    constructor(players: PlayerType[]) {
        players.forEach(player => {
            this.players.set(player.getPlayerId(), player)
        })
    }

    getPlayers(): PlayerType[] {
        const players: Array<PlayerType> = []
        this.players.forEach(player => {
            players.push(player)
        })

        return players
    }

    updatePlayer(playerId: string, data: PlayerType): PlayerType {
        this.players.set(playerId, data)

        return this.players.get(playerId) as PlayerType
    }
}

export function initPlayersStateProvider() {
    const storage = new Map<string, State>()

    return {
        initPlayersStateStorage(gameId: string, players: PlayerType[]): State {
            this.clearState(gameId)
            const state = new State(players)
            storage.set(gameId, state)

            return state
        },
        getPlayerByGameIdAndPlayerId(gameId: string, playerId: string): PlayerType | null {
            const players = this.getStateByGameId(gameId)
            if (!players) {
                return null
            }

            return players
                .find(player => player.getPlayerId() === playerId) ?? null
        },
        getStateByGameId(gameId: string): PlayerType[] | null {
            const state = storage.get(gameId)
            if (!state) {
                return null
            }

            return state.getPlayers()
        },
        updatePlayerState(gameId: string, playerId: string, data: PlayerType): PlayerType | null {
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
