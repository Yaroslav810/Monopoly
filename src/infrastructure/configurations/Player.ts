import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

class PlayerModel extends Model {
    public id!: string
    public name!: string
    public gameId!: string
}

type PlayerStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PlayerModel
}

export type {PlayerModel}

export function initPlayerConfiguration(sequelize: Sequelize) {
    return <PlayerStatic>sequelize.define("Player", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        gameId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "Game",
                key: "id"
            },
            onDelete: "cascade",
            field: "game_id"
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
