import {LevelProperty} from "../../infrastructure/configurations/Property"

export class Property {
    private readonly id!: string
    private readonly playerId!: string
    private propertyId!: number
    private numberInQueue!: number
    private level!: LevelProperty

    constructor(id: string, playerId: string, propertyId: number, numberInQueue: number, level: LevelProperty) {
        this.id = id
        this.playerId = playerId
        this.propertyId = propertyId
        this.numberInQueue = numberInQueue
        this.level = level
    }

    public getId(): string {
        return this.id
    }

    public getPlayerId(): string {
        return this.playerId
    }

    public getPropertyId(): number {
        return this.propertyId
    }

    public setPropertyId(propertyId: number): void {
        this.propertyId = propertyId
    }

    public getNumberInQueue(): number {
        return this.numberInQueue
    }

    public setNumberInQueue(numberInQueue: number): void {
        this.numberInQueue = numberInQueue
    }

    public getLevel(): LevelProperty {
        return this.level
    }

    public setLevel(level: LevelProperty): void {
        this.level = level
    }
}
