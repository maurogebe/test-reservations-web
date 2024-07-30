import { Medicament } from "./medicament.interface";

export interface MedicamentSold {
  id: number,
  quantity: number,
  medicament: Medicament
}