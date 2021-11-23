import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class GuardRailwayCompanyModel extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public quantity!: number;
    public team!: number;
}

type GuardRailwayCompanyStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): GuardRailwayCompanyModel;
}

export function initGuardRailwayCompanyConfiguration(sequelize: Sequelize) {
    return <GuardRailwayCompanyStatic>sequelize.define("guard_railway_company", {
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
}
