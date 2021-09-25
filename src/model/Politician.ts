import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

export class Politician extends Model {
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
    new (values?: Record<string, unknown>, options?: BuildOptions): Politician
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
        getByPlayerId(playerId: string) {
            return politicianProvider.findOne({
                where: {
                    playerId: playerId
                }
            })
        }
    }
}
