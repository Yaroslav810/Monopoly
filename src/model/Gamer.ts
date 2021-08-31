import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

class Gamer extends Model {
    public id!: number;
    public gameId!: number;
    public userId!: number;
    public teamId!: number;
}

type GamerStatic = typeof Gamer & {
    new (values?: object, options?: BuildOptions): Gamer
}

export function initGamerProvider(sequelize: Sequelize) {
    const gamerProvider = <GamerStatic>sequelize.define('Gamer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        gameId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Gamer',
                key: 'Id'
            },
            onDelete: "cascade"
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'Id'
            },
            onDelete: "cascade"
        },
        teamId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Team',
                key: 'Id'
            },
            onDelete: 'cascade'
        }
    }, 
    {
        freezeTableName: true,
        indexes: [
            {
                unique: true,
                fields: ['gameId', 'userId', 'teamId']
            }
        ]
    })

    return {
        create: (gameId: number, usersId: number, teamId: number) => {
            return gamerProvider.create({
                gameId: gameId,
                userId: usersId,
                teamId: teamId
            })
        },
        getGamerFromGameIdAndUserId: (gameId: number, userId: number) => {
            return gamerProvider.findOne({
                where: {
                    gameId: gameId,
                    userId: userId
                }
            })
        },
        getGamerFromGameIdAndTeamId: (gameId: number, teamId: number) => {
            return gamerProvider.findOne({
                where: {
                    gameId: gameId,
                    teamId: teamId
                }
            })
        }
    }
}
