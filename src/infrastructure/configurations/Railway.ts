import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../../core/utils/UUIDUtils"

class RailwayModel extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public nextId!: number;
    public team!: number;
}

type RailwayStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): RailwayModel
}

export function initRailwayConfiguration(sequelize: Sequelize) {
    return <RailwayStatic>sequelize.define("railway", {
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
        nextId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        team: {
            type: DataTypes.TINYINT,
            allowNull: false
        }
    })
}
