import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

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

export type {PoliticianModel}

export function initPoliticianConfiguration(sequelize: Sequelize) {
    return <PoliticianStatic>sequelize.define("Politician", {
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
}
