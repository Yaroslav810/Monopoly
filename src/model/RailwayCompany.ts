import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class RailwayCompany extends Model {
    public id!: number;
    public name!: string;
    public logo!: string;
}

type RailwayCompanyStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RailwayCompany;
}

export function initRailwayCompanyProvider(sequelize: Sequelize) {
    const RailwayCompanyProvider = <RailwayCompanyStatic>sequelize.define('railway_company', {
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
        get(RailwayCompanyID: string) {
            return RailwayCompanyProvider.findByPk(RailwayCompanyID)
        }
    }
}