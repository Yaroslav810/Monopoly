export class GameState {
    private readonly id!: string
    private readonly gameId!: string
    private currentPlayer!: string
    private chanceQueueId!: string
    private publicTreasureQueueId!: string

    constructor(id: string, gameId: string, currentPlayer: string, chanceQueueId: string, publicTreasureQueueId: string) {
        this.id = id
        this.gameId = gameId
        this.currentPlayer = currentPlayer
        this.chanceQueueId = chanceQueueId
        this.publicTreasureQueueId = publicTreasureQueueId
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

    public setCurrentPlayer(currentPlayer: string): void {
        this.currentPlayer = currentPlayer
    }

    public getChanceQueueId(): string {
        return this.chanceQueueId
    }

    public setChanceQueueId(chanceQueueId: string): void {
        this.chanceQueueId = chanceQueueId
    }

    public getPublicTreasureQueueId(): string {
        return this.publicTreasureQueueId
    }

    public setPublicTreasureQueueId(publicTreasureQueueId: string): void {
        this.publicTreasureQueueId = publicTreasureQueueId
    }
}
