import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class RailwayCompanyOffice extends Model {
    public id!: number;
    public cityId!: number;
    public teamId!: number;
}

  type RailwayCompanyOfficeStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RailwayCompanyOffice;
}

export function initRailwayCompanyOfficeProvider(sequelize: Sequelize) {
    const RailwayCompanyOfficeProvider = <RailwayCompanyOfficeStatic>sequelize.define('railway_company_office', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        cityId: {
            type: DataTypes.STRING(32),
            allowNull: false,
            references: {
                model: 'city',
                key: 'city_id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        },
        teamId: {
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