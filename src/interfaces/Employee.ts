import { Position } from "./Position";

export interface Employee {
  id: string;
  imie: string;
  nazwisko: string;
  dataZatrudnienia: string;
  pensja: number;
  stanowisko: Position;
}
