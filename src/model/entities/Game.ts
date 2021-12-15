import {GameStatus} from "../../infrastructure/configurations/Game"

export class Game {
    private readonly id!: string
    private numberPlayers!: number
    private state!: GameStatus

    constructor(id: string, numberPlayers: number, state: GameStatus) {
        this.id = id
        this.numberPlayers = numberPlayers
        this.state = state
    }

    getId(): string {
        return this.id
    }

    getNumberPlayers(): number {
        return this.numberPlayers
    }

    getState(): GameStatus {
        return this.state
    }

    setNumberPlayers(numberPlayers: number): void {
        this.numberPlayers = numberPlayers
    }

    setState(state: GameStatus): void {
        this.state = state
    }
}
