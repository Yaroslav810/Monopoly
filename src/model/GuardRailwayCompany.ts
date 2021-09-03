import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class GuardRailwayCompany extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public quantity!: number;
    public railwayCompanyId!: number;
}

type GuardRailwayCompanyStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): GuardRailwayCompany;
}

export function initGuardRailwayCompanyProvider(sequelize: Sequelize) {
    const GuardRailwayCompanyProvider = <GuardRailwayCompanyStatic>sequelize.define('guard_railway_company', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
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
        railwayCompanyId: {
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