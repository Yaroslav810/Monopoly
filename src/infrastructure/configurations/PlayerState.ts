import {BuildOptions, DataTypes, Model, Sequelize} from "sequelize"

export enum PlayerStateStatus {
    ACTIVE = "active",
    BANKRUPT = "bankrupt",
    GAVE_UP = "gaveUp",
    WINNER = "winner"
}

class PlayerStateModel extends Model {
    public id!: string
    public playerId!: string
    public amountMoney!: number
    public state!: PlayerStateStatus
}

type PlayerStateStatic = typeof Model & {
    new (values?: Record<string, unknown>, options?: BuildOptions): PlayerStateModel
}

export type {PlayerStateModel}

export function initPlayerStateConfiguration(sequelize: Sequelize) {
    return <PlayerStateStatic>sequelize.define("player_state", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        playerId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "player",
                key: "id"
            },
            onDelete: "cascade",
            field: "player_id"
        },
        amountMoney: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "amount_money"
        },
        state: {
            type: DataTypes.ENUM(
                PlayerStateStatus.ACTIVE,
                PlayerStateStatus.BANKRUPT,
                PlayerStateStatus.GAVE_UP,
                PlayerStateStatus.WINNER
            ),
            allowNull: false
        }
    })
}
