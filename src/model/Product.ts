import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class Product extends Model {
    public id!: number;
    public name!: string;
}

type ProductStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Product;
}

export function initProductProvider(sequelize: Sequelize) {
    const ProductProvider = <ProductStatic>sequelize.define('product', {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return {
        get(ProductID: string) {
            return ProductProvider.findByPk(ProductID)
        }
    }
}