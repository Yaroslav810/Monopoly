import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

export enum LevelProperty {
    ZERO = "zero",
    FIRST = "first",
    SECOND = "second",
    THIRD = "third",
    FOURTH = "fourth",
    FIFTH = "fifth"
}

class PropertyModel extends Model {
    public id!: string
    public playerId!: string
    public propertyId!: number
    public numberInQueue!: number
    public level!: LevelProperty
}

type PropertyStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PropertyModel
}

export type {PropertyModel}

export function initPropertyConfiguration(sequelize: Sequelize) {
    return <PropertyStatic>sequelize.define("property", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "player",
                key: "id"
            },
            onDelete: "cascade",
            field: "player_id"
        },
        propertyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "property_id"
        },
        numberInQueue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "number_in_queue"
        },
        level: {
            type: DataTypes.ENUM(
                LevelProperty.ZERO,
                LevelProperty.FIRST,
                LevelProperty.SECOND,
                LevelProperty.THIRD,
                LevelProperty.FOURTH,
                LevelProperty.FIFTH
            ),
            allowNull: false
        }
    })
}
