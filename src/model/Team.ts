import {Team} from "../constants/Team"
import {DataProvider} from "./DataProvider"

export function initTeamProvider(dataProvider: DataProvider) {
    
    return {
        async isTeamReserved(gameId: string, team: number) {
            const player = await dataProvider.player.getPlayerByGameIdAndTeam(gameId, team)
        
            return (player !== null)
        },
        getTeamsList() {
            return Object.keys(Team)
                .map(team => +team)
                .filter(team => !isNaN(team))
        }
    }
}
