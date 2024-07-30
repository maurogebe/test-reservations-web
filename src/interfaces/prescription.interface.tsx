import { MedicamentPrescribed } from "./medicament-prescribed.interface";
import { MedicamentSold } from "./medicament-sold.interface";
import { Patient } from "./patient.interface";

export interface Prescription {
  id?: number,
  issueDate?: Date,
  doctorName: string,
  patient: Patient,
  medicamentPrescribeds: MedicamentPrescribed[],
}