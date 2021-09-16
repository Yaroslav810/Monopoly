import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

class GuardRailwayCompany extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public quantity!: number;
    public team!: number;
}

type GuardRailwayCompanyStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): GuardRailwayCompany;
}

export function initGuardRailwayCompanyProvider(sequelize: Sequelize) {
    const guardRailwayCompanyProvider = <GuardRailwayCompanyStatic>sequelize.define("guard_railway_company", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        addressVert: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        addressHoriz: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        team: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    })
    return {
        get(guardRailwayCompanyId: string) {
            return guardRailwayCompanyProvider.findByPk(guardRailwayCompanyId)
        }
    }
}
