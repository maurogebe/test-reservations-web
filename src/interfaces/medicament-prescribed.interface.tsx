import { Medicament } from "./medicament.interface";

export interface MedicamentPrescribed {
  id?: number,
  quantity: number,
  instructions: string,
  medicament: Medicament
}