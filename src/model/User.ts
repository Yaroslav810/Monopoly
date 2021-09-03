import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class User extends Model {
    public id!: string;
    public name!: string;
}

type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): User;
}

export function initUserProvider(sequelize: Sequelize) {
    const userProvider = <UserStatic>sequelize.define('user', {
        id: {
            type: DataTypes.STRING(32),
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: generateUUId,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
    });
    return {
        get(userId: string) {
            return userProvider.findByPk(userId)
        },
        create(user: { name: string }) {
            return userProvider.create(user)
        }
    }
}