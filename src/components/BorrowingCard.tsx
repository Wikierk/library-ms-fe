import { useNavigate } from "react-router-dom";
import { Reader } from "../interfaces/Reader";
import { Book } from "../interfaces/Book";
import { Employee } from "../interfaces/Employee";

interface props {
  id: string;
  borrowingDate: string;
  returnDate?: string;
  reader: Reader;
  book: Book;
  employee: Employee;
  onDelete: (borrowingId: string) => void;
  onReturn: (borrowingId: string) => void;
}

const BorrowingCard = ({
  id,
  borrowingDate,
  returnDate,
  reader,
  book,
  employee,
  onDelete,
  onReturn,
}: props) => {
  const navigate = useNavigate();
  const handleInfoClick = () => {
    navigate(`/borrowing/${id}`);
  };
  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            <p>ID Wypozyczenia</p>
            {id}
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <p>
              <b>Data Wypożyczenia:</b>
            </p>
            {borrowingDate}
          </li>
          <li className="list-group-item">
            <p>
              <b>ID Czytelnika</b>
            </p>
            {reader.id}
          </li>
          <li className="list-group-item">
            <p>
              <b>ID Książki:</b>
            </p>
            {book.id}
          </li>
          <li className="list-group-item">
            <p>
              <b>ID Pracownika:</b>
            </p>
            {employee.id}
          </li>
          <li className="list-group-item">
            <p>
              <b>Data Zwrotu:</b>
            </p>
            {returnDate ? (
              returnDate
            ) : (
              <>
                <p className="text-danger">Nie zwrócono</p>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => onReturn(id)}
                >
                  Zwróć
                </button>
              </>
            )}
          </li>
        </ul>
        <div className="card-body">
          <div className="d-flex justify-content-around">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleInfoClick}
            >
              Szczegóły
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

export default BorrowingCard;
