import {Sequelize, DataTypes, Model, BuildOptions} from "sequelize";
import {generateUUId} from "../../core/utils/UUIDUtils";

class User extends Model {
    public id!: number;
    public name!: string;
    public uuid!: string;
}

type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): User;
}

export function initUserProvider(sequelize: Sequelize) {
    const userProvider = <UserStatic>sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        uuid: {
            type: DataTypes.STRING(36),
            unique: true,
            allowNull: false,
            defaultValue: generateUUId,
        }
    })

    return {
        getUserByUuid(userUuid: string) {
            return userProvider.findOne({
                where: {uuid: userUuid}
            })
        },
        create(user: { name: string }) {
            return userProvider.create(user)
        }
    }
}
