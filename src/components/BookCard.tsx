import { useNavigate } from "react-router-dom";
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
  onCoverChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    bookId: string
  ) => void;
  onDelete: (bookId: string) => void;
}

const BookCard = ({
  title,
  authors,
  genres,
  language,
  coverUrl,
  id,
  onCoverChange,
  onDelete,
}: props) => {
  const coverInput = document.getElementById(`file-input-${id}`);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/formPage/editBook/${id}`);
  };
  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={"api/" + coverUrl}
          alt="Dodaj zdjęcie okładki"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (coverInput) {
              coverInput.click();
            }
          }}
        />
        <input
          id={`file-input-${id}`}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => onCoverChange(e, id)}
        />
        <div className="card-body">
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
        <div className="card-body">
          <div className="d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEditClick}
            >
              Edytuj
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onDelete(id)}
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
