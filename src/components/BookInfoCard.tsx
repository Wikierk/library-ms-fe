import { Author } from "../interfaces/Author";
import { Genre } from "../interfaces/Genre";
import { Language } from "../interfaces/Language";

interface props {
  id: string;
  title: string;
  authors: Author[];
  genres: Genre[];
  language: Language;
  coverUrl: string;
  type: "info" | "infoChooser";
  isActive?: boolean;
  onCardClick?: (cardId: string) => void;
}

const BookInfoCard = ({
  title,
  authors,
  genres,
  language,
  type,
  isActive,
  onCardClick,
  id,
}: props) => {
  return (
    <>
      <div
        className={type === "infoChooser" ? "card m-3 chooser" : "card m-3"}
        style={
          isActive
            ? { width: "18rem", border: "2px solid var(--bs-success)" }
            : { width: "18rem" }
        }
        onClick={() => (onCardClick ? onCardClick(id) : () => null)}
      >
        <div className="card-body">
          <h3 className="card-title">Książka:</h3>
          <h5 className="card-title">{title}</h5>
          <p>Autorzy:</p>
          {authors &&
            authors.length > 0 &&
            authors.map((author) => (
              <p className="card-text" key={author.id}>
                {author.imie} {author.nazwisko}
              </p>
            ))}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <p>Gatunki:</p>
            {genres &&
              genres.length > 0 &&
              genres.map((genre) => <p key={genre.id}>{genre.nazwa}</p>)}
          </li>

          {language && (
            <li className="list-group-item">
              Język Wydania: <br />
              {language.nazwa}
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default BookInfoCard;
