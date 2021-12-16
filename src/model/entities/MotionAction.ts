export class MotionAction {
    private readonly id!: string
    private readonly playerId!: string
    private firstCube!: number
    private secondCube!: number

    constructor(id: string, playerId: string, firstCube: number, secondCube: number) {
        this.id = id
        this.playerId = playerId
        this.firstCube = firstCube
        this.secondCube = secondCube
    }

    public getId(): string {
        return this.id
    }

    public getPlayerId(): string {
        return this.playerId
    }

    public getFirstCube(): number {
        return this.firstCube
    }

    public setFirstCube(firstCube: number): void {
        this.firstCube = firstCube
    }

    public getSecondCube(): number {
        return this.secondCube
    }

    public setSecondCube(secondCube: number): void {
        this.secondCube = secondCube
    }
}
