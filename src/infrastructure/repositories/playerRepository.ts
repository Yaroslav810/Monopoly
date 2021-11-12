import {DbContext} from "../dbContext/context"
import {generateUUId} from "../../../core/utils/UUIDUtils"
import {MapToPlayer, MapToPolitician} from "./mappers/mapper"
import {Player} from "../../model/entities/Player"
import {Politician} from "../../model/entities/Politician"
import {Team} from "../../constants/Team"
import {RoleStateHolder} from "../../model/Player"

export type {PlayerRepository}

export function playerRepository(dbContext: DbContext): PlayerRepository {
    if (!instance) {
        instance = new PlayerRepository(dbContext)
    }

    return instance
}

let instance: PlayerRepository

class PlayerRepository {
    private readonly dbContext: DbContext;

    constructor(dbContext: DbContext) {
        this.dbContext = dbContext
    }

    async createPlayer(player: {name: string, gameId: string, team: number | null}): Promise<Player> {
        return MapToPlayer(
            await this.dbContext.player.create({
                id: generateUUId(),
                name: player.name,
                team: player.team,
                gameId: player.gameId
            })
        )
    }

    async getPlayerById(id: string): Promise<Player | null> {
        const player = await this.dbContext.player.findByPk(id)
        return player ? MapToPlayer(player) : null
    }

    async getPlayerByGameIdAndTeam(gameId: string, team: number): Promise<Player | null> {
        const player = await this.dbContext.player.findOne({
            where: {
                gameId: gameId,
                team: team
            }
        })
        return player ? MapToPlayer(player) : null
    }

    async getPlayersByGameId(gameId: string): Promise<Player[]> {
        const players = await this.dbContext.player.findAll({
            where: {
                gameId: gameId
            },
            order: ["updatedAt"]
        })
        return players.map(player => MapToPlayer(player))
    }

    async updatePlayer(player: Player): Promise<void> {
        await this.dbContext.player.update({
            gameId: player.getGameId(),
            name: player.getName(),
            team: player.getTeam()
        }, {
            where: {
                id: player.getId()
            }
        })
    }


    async createPolitician(playerId: string): Promise<Politician> {
        return MapToPolitician(
            await this.dbContext.politician.create({
                id: generateUUId(),
                playerId: playerId,
                budgetUnits: 15,
                numberMovementArmyBlanks: 0,
                numberPrBlanks: 1,
                numberRailwayConstructionBlanks: 0,
                numberWarehouseConstructionBlanks: 1,
                numberNegotiationsWithIndiansBlanks: 1,
                numberNewBlanks: 1
            })
        )
    }

    async deletePolitician(playerId: string): Promise<void> {
        await this.dbContext.politician.destroy({
            where: {
                playerId: playerId
            }
        })
    }

    async updatePolitician(politician: Politician): Promise<void> {
        await this.dbContext.politician.update({
            budgetUnits: politician.getBudgetUnits(),
            numberMovementArmyBlanks: politician.getNumberMovementArmyBlanks(),
            numberPrBlanks: politician.getNumberPrBlanks(),
            numberRailwayConstructionBlanks: politician.getNumberRailwayConstructionBlanks(),
            numberWarehouseConstructionBlanks: politician.getNumberWarehouseConstructionBlanks(),
            numberNegotiationsWithIndiansBlanks: politician.getNumberNegotiationsWithIndiansBlanks(),
            numberNewBlanks: politician.getNumberNewBlanks()
        }, {
            where: {
                playerId: politician.getPlayerId()
            }
        })
    }

    async getPoliticianByPlayerId(playerId: string): Promise<Politician | null> {
        const politician = await this.dbContext.politician.findOne({
            where: {
                playerId: playerId
            }
        })
        return politician ? MapToPolitician(politician) : null
    }

    async getPoliticianById(id: string): Promise<Politician | null> {
        const politician = await this.dbContext.politician.findByPk(id)
        return politician ? MapToPolitician(politician) : null
    }


    async getTeam(player: Player): Promise<RoleStateHolder | null> {
        switch (player.getTeam()) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return this.getPoliticianByPlayerId(player.getId())
            }
            default: {
                return null
            }
        }
    }

    async createTeam(player: Player): Promise<RoleStateHolder | null> {
        switch (player.getTeam()) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return this.createPolitician(player.getId())
            }
            default: {
                return null
            }
        }
    }

    async deleteTeam(player: Player): Promise<void> {
        switch (player.getTeam()) {
            case Team.FEDERATION:
            case Team.CONFEDERATION:
            case Team.REPUBLIC: {
                return this.deletePolitician(player.getId())
            }
            default: {
                return
            }
        }
    }
}
