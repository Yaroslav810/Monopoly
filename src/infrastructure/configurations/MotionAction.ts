import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

class MotionActionModel extends Model {
    public id!: string
    public playerId!: string
    public firstCube!: number
    public secondCube!: number
}

type MotionActionStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): MotionActionModel
}

export type {MotionActionModel}

export function initMotionActionConfiguration(sequelize: Sequelize) {
    return <MotionActionStatic>sequelize.define("motion_action", {
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
        firstCube: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "first_cube"
        },
        secondCube: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "second_cube"
        }
    })
}
