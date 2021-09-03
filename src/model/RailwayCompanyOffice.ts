import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class RailwayCompanyOffice extends Model {
    public id!: number;
    public cityId!: number;
    public railwayCompanyId!: number;
}

  type RailwayCompanyOfficeStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RailwayCompanyOffice;
}

export function initRailwayCompanyOfficeProvider(sequelize: Sequelize) {
    const RailwayCompanyOfficeProvider = <RailwayCompanyOfficeStatic>sequelize.define('railway_company_office', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        cityId: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        railwayCompanyId: {
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