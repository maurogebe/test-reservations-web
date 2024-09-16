import { Hotel } from "./hotel.interface";

export interface Room {
  id: number,
  number: string,
  description: string,
  price: number,
  capacity: number,
  hotel: Hotel
}

export interface RoomQueries {
  startDate: string | null,
  endDate: string | null,
  capacity: string | null,
  cityId: string | null
}