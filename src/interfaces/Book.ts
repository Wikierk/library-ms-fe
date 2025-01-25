import { Author } from "./Author";
import { Genre } from "./Genre";
import { Language } from "./Language";

export interface Book {
  id: string;
  isbn: string;
  tytul: string;
  autorzy: Author[];
  gatunki: Genre[];
  dataPublikacji: Date;
  jezyk: Language;
  okladkaUrl: string;
}
