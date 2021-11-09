import {GameStatus} from "../../infrastructure/configurations/Game";

export class Game {
    private readonly id!: string;
    private state!: GameStatus
    private currentMove!: number

    constructor(id: string, state: GameStatus, currentMove: number) {
        this.id = id
        this.state = state
        this.currentMove = currentMove
    }

    getId(): string {
        return this.id
    }

    getState(): GameStatus {
        return this.state
    }

    setState(state: GameStatus): void {
        this.state = state
    }

    getCurrentMove(): number {
        return this.currentMove
    }

    setCurrentMove(currentMove: number): void {
        this.currentMove = currentMove
    }
}
