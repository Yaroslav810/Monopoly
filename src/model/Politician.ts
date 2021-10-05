import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"
import {PlayerRole} from "./Player"

class PoliticianModel extends Model {
    public id!: string
    public playerId!: string
    public budgetUnits!: number
    public numberMovementArmyBlanks!: number
    public numberPrBlanks!: number
    public numberRailwayConstructionBlanks!: number
    public numberWarehouseConstructionBlanks!: number
    public numberNegotiationsWithIndiansBlanks!: number
    public numberNewBlanks!: number
}

type PoliticianStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PoliticianModel
}

export class Politician {
    private id: string
    private playerId: string
    private budgetUnits: number
    private numberMovementArmyBlanks: number
    private numberPrBlanks: number
    private numberRailwayConstructionBlanks: number
    private numberWarehouseConstructionBlanks: number
    private numberNegotiationsWithIndiansBlanks: number
    private numberNewBlanks: number

    constructor(politicianModel: PoliticianModel) {
        this.id = politicianModel.id
        this.playerId = politicianModel.playerId
        this.budgetUnits = politicianModel.budgetUnits
        this.numberMovementArmyBlanks = politicianModel.numberMovementArmyBlanks
        this.numberPrBlanks = politicianModel.numberPrBlanks
        this.numberRailwayConstructionBlanks = politicianModel.numberRailwayConstructionBlanks
        this.numberWarehouseConstructionBlanks = politicianModel.numberWarehouseConstructionBlanks
        this.numberNegotiationsWithIndiansBlanks = politicianModel.numberNegotiationsWithIndiansBlanks
        this.numberNewBlanks = politicianModel.numberNewBlanks
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

    public prepareToOrdersStep() {
        this.setNumberMovementArmyBlanks(1)
        this.setNumberNewBlanks(1)
    }

    private setNumberMovementArmyBlanks(numberMovementArmyBlanks: number) {
        this.numberMovementArmyBlanks = numberMovementArmyBlanks
    }

    private setNumberNewBlanks(numberNewBlanks: number) {
        this.numberNewBlanks = numberNewBlanks
    }
}

export function initPoliticianProvider(sequelize: Sequelize) {
    const politicianProvider = <PoliticianStatic>sequelize.define("politician", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
            references: {
                model: "player",
                key: "id"
            },
            onDelete: "cascade"
        },
        budgetUnits: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberMovementArmyBlanks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberPrBlanks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberRailwayConstructionBlanks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberWarehouseConstructionBlanks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberNegotiationsWithIndiansBlanks: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        numberNewBlanks: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        underscored: true
    })

    return {
        create(playerId: string) {
            return politicianProvider.create({
                id: generateUUId(),
                playerId: playerId,
                budgetUnits: 15,
                numberMovementArmyBlanks: 0,
                numberPrBlanks: 1,
                numberRailwayConstructionBlanks: 0,
                numberWarehouseConstructionBlanks: 1,
                numberNegotiationsWithIndiansBlanks: 1,
                numberNewBlanks: 1
            })
        },
        delete(playerId: string) {
            return politicianProvider.destroy({
                where: {
                    playerId: playerId
                }
            })
        },
        update(politician: Politician) {
            return politicianProvider.update({
                budgetUnits: politician.getBudgetUnits(),
                numberMovementArmyBlanks: politician.getNumberMovementArmyBlanks(),
                numberPrBlanks: politician.getNumberPrBlanks(),
                numberRailwayConstructionBlanks: politician.getNumberRailwayConstructionBlanks(),
                numberWarehouseConstructionBlanks: politician.getNumberWarehouseConstructionBlanks(),
                numberNegotiationsWithIndiansBlanks: politician.getNumberNegotiationsWithIndiansBlanks(),
                numberNewBlanks: politician.getNumberNewBlanks()
            }, {
                where: {
                    playerId: politician.getPlayerId()
                }
            })
        },
        async getByPlayerId(playerId: string) {
            const politician = await politicianProvider.findOne({
                where: {
                    playerId: playerId
                }
            })

            return politician
                ? new Politician(politician)
                : null
        },
        async finishToOrderStep(politicianId: string) {
            const politician = await politicianProvider.findByPk(politicianId)
            if (!politician) {
                return null
            }

            return politician.increment('budgetUnits', {by: 15})
        },
        isPolitician(player: PlayerRole): player is Politician {
            return player && player instanceof Politician
        }
    }
}
