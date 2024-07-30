import { Allergy } from "./allergy.interface";

export interface Patient {
  id?: number,
  name: string,
  email: string,
  healthInsuranceNumber: string,
  birthDate?: Date,
  allergies?: Allergy[],
}