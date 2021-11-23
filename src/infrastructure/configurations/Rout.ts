import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class RoutModel extends Model {
    public id!: number;
    public cityId1!: number;
    public cityId2!: number;
    public team!: number;
    public cost!: number;
}

type RoutStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): RoutModel
}

export function initRoutConfiguration(sequelize: Sequelize) {
    return <RoutStatic>sequelize.define("rout", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        cityId1: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "city",
                key: "id"
            },
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        },
        cityId2: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "city",
                key: "id"
            },
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        },
        team: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        cost: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    })
}
