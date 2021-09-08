import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class Warehouse extends Model {
    public id!: number;
    public tradeCompanyId!: number;
    public cityId!: number;
    public quantity!: number;
}

type WarehouseStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Warehouse;
}

export function initWarehouseProvider(sequelize: Sequelize) {
    const WarehouseProvider = <WarehouseStatic>sequelize.define('warehouse', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        tradeCompanyId: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        cityId: {
            type: DataTypes.STRING(32),
            allowNull: false,
            references: {
                model: 'city',
                key: 'city_id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        },
        quantity: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        }
    });
    return {
        get(WarehouseID: string) {
            return WarehouseProvider.findByPk(WarehouseID)
        }
    }
}