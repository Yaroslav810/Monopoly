import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

class PlayerModel extends Model {
    public id!: string;
    public name!: string;
    public team!: number;
    public gameId!: string;
}

type PlayerStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PlayerModel
}

export type { PlayerModel }

export function initPlayerConfiguration(sequelize: Sequelize) {
    return <PlayerStatic>sequelize.define("Player", {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            team: {
                type: DataTypes.TINYINT,
                field: "team"
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
            }
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ["team", "game_id"]
                }
            ],
            underscored: true
        })
}
