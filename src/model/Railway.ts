import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class Railway extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public next!: number;
    public railwayCompany!: number;
}

type RailwayStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Railway;
}

export function initRailwayProvider(sequelize: Sequelize) {
    const RailwayProvider = <RailwayStatic>sequelize.define('railway', {
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
        next: {
            type: DataTypes.SMALLINT,
            allowNull: false,
        },
        railwayCompany: {
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