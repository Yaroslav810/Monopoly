import {ActionType} from "../../../configurations/Action"

export class Action {
    private readonly id!: string
    private readonly gameId!: string
    private numberInQueue!: number
    private type!: ActionType
    private actionId!: string

    constructor(id: string, gameId: string, numberInQueue: number, type: ActionType, actionId: string) {
        this.id = id
        this.gameId = gameId
        this.numberInQueue = numberInQueue
        this.type = type
        this.actionId = actionId
    }

    public getId(): string {
        return this.id
    }

    public getGameId(): string {
        return this.gameId
    }

    public getNumberInQueue(): number {
        return this.numberInQueue
    }

    public setNumberInQueue(numberInQueue: number): void {
        this.numberInQueue = numberInQueue
    }

    public getType(): ActionType {
        return this.type
    }

    public setType(type: ActionType): void {
        this.type = type
    }

    public getActionId(): string {
        return this.actionId
    }

    public setActionId(actionId: string): void {
        this.actionId = actionId
    }
}
