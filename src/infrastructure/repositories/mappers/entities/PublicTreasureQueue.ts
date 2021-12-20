export class PublicTreasureQueue {
    private readonly id!: string
    private readonly gameId!: string
    private publicTreasureCardId!: number
    private numberInQueue!: number

    constructor(id: string, gameId: string, publicTreasureCardId: number, numberInQueue: number) {
        this.id = id
        this.gameId = gameId
        this.publicTreasureCardId = publicTreasureCardId
        this.numberInQueue = numberInQueue
    }

    public getId(): string {
        return this.id
    }

    public getGameId(): string {
        return this.gameId
    }

    public getPublicTreasureCardId(): number {
        return this.publicTreasureCardId
    }

    public setPublicTreasureCardId(publicTreasureCardId: number): void {
        this.publicTreasureCardId = publicTreasureCardId
    }

    public getNumberInQueue(): number {
        return this.numberInQueue
    }

    public setNumberInQueue(numberInQueue: number): void {
        this.numberInQueue = numberInQueue
    }
}
