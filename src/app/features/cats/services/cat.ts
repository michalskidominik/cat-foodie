import { type CatStatus } from "../../../shared";

export interface Cat {
  id: string | null;
  name: string;
  breed: string;
  birthDate: Date;
  weight: number;
  weightDateUpdated: Date;
  status: CatStatus;
}
