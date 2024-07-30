import { MedicamentSold } from "./medicament-sold.interface";
import { Patient } from "./patient.interface";

export interface Sale {
  id: number,
  total: number,
  saleDate: Date,
  patient: Patient,
  medicamentsSold: MedicamentSold[],
}