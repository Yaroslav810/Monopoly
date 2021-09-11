import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class Rout extends Model {
    public id!: number;
    public cityId1!: number;
    public cityId2!: number;
    public teamId!: number;
    public cost!: number;
}

type RoutStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Rout;
}

export function initRoutProvider(sequelize: Sequelize) {
    const RoutProvider = <RoutStatic>sequelize.define('rout', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        cityId1: {
            type: DataTypes.STRING(32),
            allowNull: false,
            references: {
                model: 'city',
                key: 'city_id'
            },
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        },
        cityId2: {
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
            allowNull: true,
        },
        cost: {
            type: DataTypes.BIGINT,
            allowNull: false,
        }
    });
    return {
        get(RoutID: string) {
            return RoutProvider.findByPk(RoutID)
        }
    }
}