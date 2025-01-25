import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReaderCard from "../components/ReaderCard";
import { Reader } from "../interfaces/Reader";

const Readers = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  useEffect(() => {
    const fetchReaders = async () => {
      try {
        const response = await axios.get("/api/readers");
        setReaders(response.data);
      } catch (error) {
        console.error("Error fetching readers:", error);
      }
    };

    fetchReaders();
  }, []);

  const handleOnDelete = async (readerId: string) => {
    try {
      await axios.delete(`/api/readers/${readerId}`);
      setReaders((prevReaders) =>
        prevReaders.filter((reader) => reader.id !== readerId)
      );
    } catch (error) {
      console.error("Error deleting reader:", error);
      alert("Wystąpił błąd podczas usuwania czytelnika.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-3 col-md-2 bg-light border-end"
          style={{ minHeight: "100vh", height: "auto" }}
        >
          <nav className="nav flex-column p-3">
            <Link to="/formPage/reader" className="nav-link">
              Dodaj Czytelnika
            </Link>
            <Link to="/" className="nav-link">
              Powrót
            </Link>
          </nav>
        </div>

        <div className="col-9 col-md-10 p-4 container d-flex flex-column align-items-center">
          <h1>Dostępni Czytelnicy</h1>
          <div className="row">
            {readers.map((reader) => (
              <ReaderCard
                key={reader.id}
                id={reader.id}
                name={reader.imie}
                lastName={reader.nazwisko}
                registrationDate={reader.dataRejestracji}
                phoneNumber={reader.telefon}
                email={reader.email}
                onDelete={handleOnDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Readers;
