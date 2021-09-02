import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class Warehouse extends Model {
    public id!: number;
    public tradeCompany!: number;
    public city!: number;
    public quantity!: number;
}

type WarehouseStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Warehouse;
}

export function initWarehouseProvider(sequelize: Sequelize) {
    const WarehouseProvider = <WarehouseStatic>sequelize.define('warehouse', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        tradeCompany: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        city: {
            type: DataTypes.SMALLINT,
            allowNull: false,
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