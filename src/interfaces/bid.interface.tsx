import { Player } from "./player.interface";
import { User } from "./user.interface";

export interface Bid {
  id?: number,
  amount?: number,
  active?: boolean,
  user?: User,
  player?: Player
}