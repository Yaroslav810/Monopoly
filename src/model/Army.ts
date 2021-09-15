import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize"
import {generateUUId} from "../../core/utils/UUIDUtils"

class Army extends Model {
    public id!: number;
    public addressVert!: number;
    public addressHoriz!: number;
    public quantity!: number;
    public team!: number;
}

type ArmyStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): Army;
}

export function initArmyProvider(sequelize: Sequelize) {
    const armyProvider = <ArmyStatic>sequelize.define("army", {
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
    return {
        get(armyId: string) {
            return armyProvider.findByPk(armyId)
        }
    }
}
