export enum StartGameAwaitingPlayerState {
    AWAITING,
    NOT_AWAITING
}

class StartGameAwaiting<KEY> {
    initGameAwaiting(gameId: KEY): void {
        this.state.set(gameId, new Map())
    }

    addPlayer(gameId: KEY, playerId: KEY): void {
        const state = this.state.get(gameId)
        if (!state) {
            return
        }

        state.set(playerId, StartGameAwaitingPlayerState.NOT_AWAITING)
    }

    removePlayer(gameId: KEY, playerId: KEY): void {
        const state = this.state.get(gameId)
        if (!state) {
            return
        }

        state.delete(playerId)
    }

    setPlayerState(gameId: KEY, playerId: KEY, playerState: StartGameAwaitingPlayerState): void {
        const state = this.state.get(gameId)
        if (!state) {
            return
        }

        state.set(playerId, playerState)
    }

    deleteGameAwaiting(gameId: KEY): void {
        this.state.delete(gameId)
    }

    isAllPlayersHasState(gameId: KEY, playerState: StartGameAwaitingPlayerState): boolean {
        const state = this.state.get(gameId)
        if (!state) {
            return false
        }

        return Array.from(state.values()).every(state => state === playerState)
    }

    private state = new Map<KEY, Map<KEY, StartGameAwaitingPlayerState>>()
}

export function initStartGameAwaiting() {
    return new StartGameAwaiting<string>()
}
