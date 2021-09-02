import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class RailwayCompanyOffice extends Model {
    public id!: number;
    public city!: number;
    public railwayCompany!: number;
}

  type RailwayCompanyOfficeStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RailwayCompanyOffice;
}

export function initRailwayCompanyOfficeProvider(sequelize: Sequelize) {
    const RailwayCompanyOfficeProvider = <RailwayCompanyOfficeStatic>sequelize.define('railway_company_office', {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        city: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        railwayCompany: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    });
    return {
        get(RailwayCompanyOfficeID: string) {
            return RailwayCompanyOfficeProvider.findByPk(RailwayCompanyOfficeID)
        }
    }
}