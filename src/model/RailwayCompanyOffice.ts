import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

class RailwayCompanyOffice extends Model {
    public id!: number;
    public cityId!: number;
    public team!: number;
}

  type RailwayCompanyOfficeStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): RailwayCompanyOffice;
}

export function initRailwayCompanyOfficeProvider(sequelize: Sequelize) {
    const railwayCompanyOfficeProvider = <RailwayCompanyOfficeStatic>sequelize.define("railway_company_office", {
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
                key: "city_id"
            },
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION"
        },
        team: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    })
    return {
        get(railwayCompanyOfficeId: string) {
            return railwayCompanyOfficeProvider.findByPk(railwayCompanyOfficeId)
        }
    }
}
