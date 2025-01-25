interface Props {
  id: string;
  name: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  registrationDate: string;
  type: "info" | "infoChooser";
  isActive?: boolean;
  onCardClick?: (cardId: string) => void;
}

const ReaderInfoCard = ({
  id,
  name,
  lastName,
  phoneNumber,
  email,
  registrationDate,
  type,
  isActive,
  onCardClick,
}: Props) => {
  return (
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
        <h3 className="card-title">Czytelnik:</h3>
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
    </div>
  );
};

export default ReaderInfoCard;
