import {PlayerStateStatus} from "../../../configurations/PlayerState"

export class PlayerState {
    private readonly id!: string
    private readonly playerId!: string
    private amountMoney!: number
    private state!: PlayerStateStatus

    constructor(id: string, playerId: string, amountMoney: number, state: PlayerStateStatus) {
        this.id = id
        this.playerId = playerId
        this.amountMoney = amountMoney
        this.state = state
    }

    public getId(): string {
        return this.id
    }

    public getPlayerId(): string {
        return this.playerId
    }

    public getAmountMoney(): number {
        return this.amountMoney
    }

    public setAmountMoney(amountMoney: number): void {
        this.amountMoney = amountMoney
    }

    public getState(): PlayerStateStatus {
        return this.state
    }

    public setState(state: PlayerStateStatus): void {
        this.state = state
    }
}
