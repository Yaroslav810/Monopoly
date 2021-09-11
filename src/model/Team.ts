import {Team} from "../constants/Team"
import {DataProvider} from "./DataProvider"

export function initTeamProvider(dataProvider: DataProvider) {
    
    return {
        async isTeamReserved(gameId: string, teamId: number) {
            const player = await dataProvider.player.getPlayerByGameIdAndTeamId(gameId, teamId)
        
            return (player !== null) ? true : false
        },
        getTeamsList() {
            return Object.keys(Team)
                .map(team => +team)
                .filter(team => !isNaN(team))
        }
    }
}
