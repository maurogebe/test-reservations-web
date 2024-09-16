import { City } from "./city.interface";

export interface Hotel {
  id: number,
  name: string,
  description: string,
  address: string,
  city: City
}