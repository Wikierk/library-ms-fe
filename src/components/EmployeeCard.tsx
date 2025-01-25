import { useNavigate } from "react-router-dom";
import { Position } from "../interfaces/Position";

interface props {
  id: string;
  name: string;
  lastName: string;
  dateOfEmployment: string;
  salary: Number;
  position: Position;
  onDelete: (readerId: string) => void;
}

const EmployeeCard = ({
  id,
  name,
  lastName,
  dateOfEmployment,
  salary,
  position,
  onDelete,
}: props) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/formPage/editEmployee/${id}`);
  };
  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            <p>Imię i nazwisko:</p>
            {`${name} ${lastName}`}
          </h5>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <p>
              <b>Stanowisko:</b>
            </p>
            {position.nazwa}
          </li>
          <li className="list-group-item">
            <p>
              <b>Pensja:</b>
            </p>
            {`${salary.toString()} zł`}
          </li>
          <li className="list-group-item">
            <p>
              <b>Data Zatrudnienia:</b>
            </p>
            {dateOfEmployment}
          </li>
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

export default EmployeeCard;
