import {playerId} from "../../../model/Player";
import {roleId} from "../../../model/Role";

export const getRoles = async () => {
  return {
    railways: {
      role_id: roleId.RAILWAYS,
      players_id: [
        playerId.SOUTH_EASTERN_RAILWAY,
        playerId.PACIFIC_RAILWAY,
        playerId.SOUTH_WESTERN_RAILWAY,
        playerId.NORTHERN_RAILWAY,
        playerId.NEW_YORK_RAILWAY,
        playerId.TEXAS_RAILWAY
      ]
    },
    policies: {
      role_id: roleId.POLICIES,
      players_id: [
        playerId.FEDERATION,
        playerId.CONFEDERATION,
        playerId.REPUBLIC
      ]
    },
    tradingCompanies: {
      role_id: roleId.TRADINGCOMPANIES,
      players_id: [
        playerId.PRESCOTT,
        playerId.WASHINGTON,
        playerId.BISMARCK,
        playerId.LITTLE_ROCK
      ]
    }
  }
}
