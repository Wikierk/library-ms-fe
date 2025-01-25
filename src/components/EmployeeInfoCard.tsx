import { Position } from "../interfaces/Position";

interface props {
  id: string;
  name: string;
  lastName: string;
  dateOfEmployment: string;
  salary: Number;
  position: Position;
  type: "info" | "infoChooser";
  isActive?: boolean;
  onCardClick?: (cardId: string) => void;
}

const EmployeeInfoCard = ({
  name,
  lastName,
  dateOfEmployment,
  salary,
  position,
  type,
  id,
  isActive,
  onCardClick,
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
          <h3 className="card-title">Pracownik:</h3>
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
      </div>
    </>
  );
};

export default EmployeeInfoCard;
