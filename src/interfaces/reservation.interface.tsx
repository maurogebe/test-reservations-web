import { Customer } from "./customer.interface";
import { Room } from "./room.interface";

export interface Reservation {
  id: number,
  startDate: Date,
  endDate: Date,
  room: Room,
  customer: Customer
}

export interface ReservationQueries {
  customerId: string | null,
  startDate: string | null,
  endDate: string | null,
  roomId: string | null
}