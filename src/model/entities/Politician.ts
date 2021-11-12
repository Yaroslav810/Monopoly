export class Politician {
    private readonly id: string
    private readonly playerId: string
    private budgetUnits: number
    private numberMovementArmyBlanks: number
    private numberPrBlanks: number
    private numberRailwayConstructionBlanks: number
    private numberWarehouseConstructionBlanks: number
    private numberNegotiationsWithIndiansBlanks: number
    private numberNewBlanks: number

    constructor(
        id: string,
        playerId: string,
        budgetUnits: number,
        numberMovementArmyBlanks: number,
        numberPrBlanks: number,
        numberRailwayConstructionBlanks: number,
        numberWarehouseConstructionBlanks: number,
        numberNegotiationsWithIndiansBlanks: number,
        numberNewBlanks: number
    ) {
        this.id = id
        this.playerId = playerId
        this.budgetUnits = budgetUnits
        this.numberMovementArmyBlanks = numberMovementArmyBlanks
        this.numberPrBlanks = numberPrBlanks
        this.numberRailwayConstructionBlanks = numberRailwayConstructionBlanks
        this.numberWarehouseConstructionBlanks = numberWarehouseConstructionBlanks
        this.numberNegotiationsWithIndiansBlanks = numberNegotiationsWithIndiansBlanks
        this.numberNewBlanks = numberNewBlanks
    }

    public getId = (): string => {
        return this.id
    }

    public getPlayerId(): string {
        return this.playerId
    }

    public getBudgetUnits = (): number => {
        return this.budgetUnits
    }

    public changeBudgetUnits(change: number): number {
        this.budgetUnits += change
        return this.budgetUnits
    }

    public getNumberMovementArmyBlanks(): number {
        return this.numberMovementArmyBlanks
    }

    public changeNumberMovementArmyBlanks(change: number): number {
        this.numberMovementArmyBlanks += change
        return this.numberMovementArmyBlanks
    }

    public getNumberPrBlanks(): number {
        return this.numberPrBlanks
    }

    public changeNumberPrBlanks(change: number): number {
        this.numberPrBlanks += change
        return this.numberPrBlanks
    }

    public getNumberRailwayConstructionBlanks(): number {
        return this.numberRailwayConstructionBlanks
    }

    public changeNumberRailwayConstructionBlanks(change: number): number {
        this.numberRailwayConstructionBlanks += change
        return this.numberRailwayConstructionBlanks
    }

    public getNumberWarehouseConstructionBlanks(): number {
        return this.numberWarehouseConstructionBlanks
    }

    public changeNumberWarehouseConstructionBlanks(change: number): number {
        this.numberWarehouseConstructionBlanks += change
        return this.numberWarehouseConstructionBlanks
    }

    public getNumberNegotiationsWithIndiansBlanks(): number {
        return this.numberNegotiationsWithIndiansBlanks
    }

    public changeNumberNegotiationsWithIndiansBlanks(change: number): number {
        this.numberNegotiationsWithIndiansBlanks += change
        return this.numberNegotiationsWithIndiansBlanks
    }

    public getNumberNewBlanks(): number {
        return this.numberNewBlanks
    }

    public changeNumberNewBlanks(change: number): number {
        this.numberNewBlanks += change
        return this.numberNewBlanks
    }

    public setNumberMovementArmyBlanks(numberMovementArmyBlanks: number) {
        this.numberMovementArmyBlanks = numberMovementArmyBlanks
    }

    public setNumberNewBlanks(numberNewBlanks: number) {
        this.numberNewBlanks = numberNewBlanks
    }
}