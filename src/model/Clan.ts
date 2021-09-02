import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";

class Clan extends Model {
    public id!: string;
    public name!: string;   
}

type ClanStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): Clan;
}

export function initClanProvider(sequelize: Sequelize) {
    const ClanProvider = <ClanStatic>sequelize.define('clan', {
        id: {
            type: DataTypes.STRING(36),
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    });
    return {
        get(ClanId: string) {
            return ClanProvider.findByPk(ClanId)
        }
    }
}