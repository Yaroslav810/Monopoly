import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

class Warehouse extends Model {
    public id!: number;
    public team!: number;
    public cityId!: number;
    public quantity!: number;
}

type WarehouseStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): Warehouse;
}

export function initWarehouseProvider(sequelize: Sequelize) {
    const warehouseProvider = <WarehouseStatic>sequelize.define("warehouse", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        team: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        cityId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "city",
                key: "id"
            },
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
            field: "city_id"
        },
        quantity: {
            type: DataTypes.SMALLINT,
            allowNull: false
        }
    })
    return {
        get(warehouseId: string) {
            return warehouseProvider.findByPk(warehouseId)
        }
    }
}
