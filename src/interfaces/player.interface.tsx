import { Bid } from "./bid.interface";
import { Club } from "./club.interface";
import { Nationality } from "./nationality.interface";
import { Position } from "./position.interface";

export interface Player {
  id: number,
  firstName: string,
  lastName?: string,
  overallRating?: number
  skillMoves?: number,
  avatarUrl?: string,
  shieldUrl?: string,
  nationality?: Nationality,
  position?: Position,
  club?: Club,
  orderTeam?: number
}

export interface ResponseGetPlayers {
  players: Player[],
  totalItems: number,
  amount: number,
  myBids: Bid[]
}