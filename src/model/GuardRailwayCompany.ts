import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class GuardRailwayCompany extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public quantity!: number;
    public railwayCompany!: number;
}

type GuardRailwayCompanyStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): GuardRailwayCompany;
}

export function initGuardRailwayCompanyProvider(sequelize: Sequelize) {
    const GuardRailwayCompanyProvider = <GuardRailwayCompanyStatic>sequelize.define('guard_railway_company', {
        id: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        addressVert: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        addressHoriz: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        railwayCompany: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    });
    return {
        get(GuardRailwayCompanyID: string) {
            return GuardRailwayCompanyProvider.findByPk(GuardRailwayCompanyID)
        }
    }
}