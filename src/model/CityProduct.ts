import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

class CityProduct extends Model {
    public id!: number;
    public cityId!: number;
    public productId!: number;
    public price!: number;
    public team!: number;
}

type CityProductStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): CityProduct;
}

export function initCityProductProvider(sequelize: Sequelize) {
    const cityProductProvider = <CityProductStatic>sequelize.define("city_product", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
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
        productId: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        price: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        team: {
            type: DataTypes.UUID,
            allowNull: false
        }
    })
    return {
        get(cityProductId: string) {
            return cityProductProvider.findByPk(cityProductId)
        }
    }
}
