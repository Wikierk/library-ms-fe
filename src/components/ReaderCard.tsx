import { useNavigate } from "react-router-dom";

interface props {
  id: string;
  name: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  registrationDate: string;
  onDelete: (readerId: string) => void;
}

const ReaderCard = ({
  id,
  name,
  lastName,
  phoneNumber,
  email,
  registrationDate,
  onDelete,
}: props) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/formPage/editReader/${id}`);
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
              <b>Email:</b>
            </p>
            {email}
          </li>
          <li className="list-group-item">
            <p>
              <b>Numer Telefonu:</b>
            </p>
            {phoneNumber ? phoneNumber : " Nie podano"}
          </li>
          <li className="list-group-item">
            <p>
              <b>Data Rejestracji:</b>
            </p>
            {registrationDate}
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

export default ReaderCard;
