import { Player } from "./player.interface";
import { User } from "./user.interface";

export interface Team {
  id?: number,
  name: string,
  club: string,
  user?: User,
  players: Player[],
  lineupPlayers: Player[],
  budget?: number,
  lineup?: string
}