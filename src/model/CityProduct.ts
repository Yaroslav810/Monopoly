import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class CityProduct extends Model {
    public id!: number;
    public city!: number;
    public product!: number;
    public price!: number;
    public tradeCompany!: number;
}

type CityProductStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CityProduct;
}

export function initCityProductProvider(sequelize: Sequelize) {
    const CityProductProvider = <CityProductStatic>sequelize.define('city_product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        city: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        product: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        price: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        tradeCompany: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        }
    });
    return {
        get(CityProductID: string) {
            return CityProductProvider.findByPk(CityProductID)
        }
    }
}