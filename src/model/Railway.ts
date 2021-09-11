import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class Railway extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public nextId!: number;
    public teamId!: number;
}

type RailwayStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Railway;
}

export function initRailwayProvider(sequelize: Sequelize) {
    const RailwayProvider = <RailwayStatic>sequelize.define('railway', {
        id: {
            type: DataTypes.UUID,
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
        nextId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        teamId: {
            type: DataTypes.TINYINT,
            allowNull: false,
        }
    });
    return {
        get(RailwayID: string) {
            return RailwayProvider.findByPk(RailwayID)
        }
    }
}