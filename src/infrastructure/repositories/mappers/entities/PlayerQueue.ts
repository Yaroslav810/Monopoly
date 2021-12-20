export class PlayerQueue {
    private readonly id!: string
    private readonly playerId!: string
    private numberInQueue!: number

    constructor(id: string, playerId: string, numberInQueue: number) {
        this.id = id
        this.playerId = playerId
        this.numberInQueue = numberInQueue
    }

    public getId(): string {
        return this.id
    }

    public getPlayerId(): string {
        return this.playerId
    }

    public getNumberInQueue(): number {
        return this.numberInQueue
    }

    public setNumberInQueue(numberInQueue: number): void {
        this.numberInQueue = numberInQueue
    }
}
