export class GameState {
    private readonly id!: string
    private readonly gameId!: string
    private readonly currentPlayer!: string
    private readonly chanceQueueId!: string
    private readonly publicTreasureQueue!: string

    constructor(id: string, gameId: string, currentPlayer: string, chanceQueueId: string, publicTreasureQueue: string) {
        this.id = id
        this.gameId = gameId
        this.currentPlayer = currentPlayer
        this.chanceQueueId = chanceQueueId
        this.publicTreasureQueue = publicTreasureQueue
    }

    public getId(): string {
        return this.id
    }

    public getGameId(): string {
        return this.gameId
    }

    public getCurrentPlayer(): string {
        return this.currentPlayer
    }

    public getChanceQueueId(): string {
        return this.chanceQueueId
    }

    public getPublicTreasureQueue(): string {
        return this.publicTreasureQueue
    }
}
