import {PlayerStateStatus} from "../../../configurations/PlayerState"

export class PlayerState {
    private readonly id!: string
    private readonly playerId!: string
    private amountMoney!: number
    private state!: PlayerStateStatus
    private positionOnMap!: number | null
    private hasRollDice!: boolean

    constructor(id: string, playerId: string, amountMoney: number, state: PlayerStateStatus, positionOnMap: number | null, hasRollDice: boolean) {
        this.id = id
        this.playerId = playerId
        this.amountMoney = amountMoney
        this.state = state
        this.positionOnMap = positionOnMap
        this.hasRollDice = hasRollDice
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

    public getPositionOnMap(): number | null {
        return this.positionOnMap
    }

    public setPositionOnMap(positionOnMap: number | null): void {
        this.positionOnMap = positionOnMap
    }

    public getHasRollDice(): boolean {
        return this.hasRollDice
    }

    public setHasRollDice(hasRollDice: boolean): void {
        this.hasRollDice = hasRollDice
    }
}
