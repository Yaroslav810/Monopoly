import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class Terrain extends Model {
    public id!: number;
    public name!: string;
}

type TerrainStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Terrain;
}

export function initTerrainProvider(sequelize: Sequelize) {
    const TerrainProvider = <TerrainStatic>sequelize.define('terrain', {
        id: {
            type: DataTypes.TINYINT,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return {
        get(TerrainID: string) {
            return TerrainProvider.findByPk(TerrainID)
        }
    }
}