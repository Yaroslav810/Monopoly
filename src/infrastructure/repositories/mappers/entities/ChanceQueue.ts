export class ChanceQueue {
    private readonly id!: string
    private readonly gameId!: string
    private chanceCardId!: number
    private numberInQueue!: number

    constructor(id: string, gameId: string, chanceCardId: number, numberInQueue: number) {
        this.id = id
        this.gameId = gameId
        this.chanceCardId = chanceCardId
        this.numberInQueue = numberInQueue
    }

    public getId(): string {
        return this.id
    }

    public getGameId(): string {
        return this.gameId
    }

    public getChanceCardId(): number {
        return this.chanceCardId
    }

    public setChanceCardId(chanceCardId: number): void {
        this.chanceCardId = chanceCardId
    }

    public getNumberInQueue(): number {
        return this.numberInQueue
    }

    public setNumberInQueue(numberInQueue: number): void {
        this.numberInQueue = numberInQueue
    }
}
