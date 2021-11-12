import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../../core/utils/UUIDUtils";

class RiverModel extends Model {
    public id!: number;
    public addressVert1!: number;
    public addressHoriz1!: number;
    public addressVert2!: number;
    public addressHoriz2!: number;
}

type RiverStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): RiverModel
}

export function initRiverConfiguration(sequelize: Sequelize) {
    return <RiverStatic>sequelize.define("river", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId
        },
        addressVert1: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        addressHoriz1: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        addressVert2: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        addressHoriz2: {
            type: DataTypes.SMALLINT,
            allowNull: false
        }
    })
}
