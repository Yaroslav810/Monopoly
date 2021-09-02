import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class TradeCompany extends Model {
    public id!: number;
    public name!: string;
    public logo!: string;
}

type TradeCompanyStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): TradeCompany;
}

export function initTradeCompanyProvider(sequelize: Sequelize) {
    const TradeCompanyProvider = <TradeCompanyStatic>sequelize.define('trade_company', {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return {
        get(TradeCompanyID: string) {
            return TradeCompanyProvider.findByPk(TradeCompanyID)
        }
    }
}