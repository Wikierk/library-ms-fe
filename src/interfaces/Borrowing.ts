import { Book } from "./Book";
import { Employee } from "./Employee";
import { Reader } from "./Reader";

export interface Borrowing {
  id: string;
  dataWypozyczenia: string;
  dataZwrotu: string;
  czytelnik: Reader;
  ksiazka: Book;
  pracownik: Employee;
}
