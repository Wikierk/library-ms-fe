import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Borrowing } from "../interfaces/Borrowing";
import BorrowingCard from "../components/BorrowingCard";

const Borrowings = () => {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await axios.get("/api/borrowings");
        setBorrowings(response.data);
      } catch (error) {
        console.error("Error fetching borrowings:", error);
      }
    };

    fetchBorrowings();
  }, []);

  const handleOnDelete = async (borrowingId: string) => {
    try {
      await axios.delete(`/api/borrowings/${borrowingId}`);
      setBorrowings((prevBorrowings) =>
        prevBorrowings.filter((borrowing) => borrowing.id !== borrowingId)
      );
    } catch (error) {
      console.error("Error deleting borrowing:", error);
      alert("Wystąpił błąd podczas usuwania wypozyczenia.");
    }
  };

  const handleOnReturn = async (borrowingId: string) => {
    try {
      const response = await axios.patch<Borrowing>(
        `/api/borrowings/${borrowingId}`
      );
      setBorrowings((prevBorrowings) =>
        prevBorrowings.map((borrowing) =>
          borrowing.id === borrowingId
            ? {
                ...borrowing,
                dataZwrotu: response.data.dataZwrotu.slice(0, 10),
              }
            : borrowing
        )
      );
    } catch (error) {
      console.error("Error returning borrowing:", error);
      alert("Wystąpił błąd podczas zwracania wypozyczenia.");
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
            <Link to="/formPage/borrowing" className="nav-link">
              Dodaj Wypozyczenie
            </Link>
            <Link to="/" className="nav-link">
              Powrót
            </Link>
          </nav>
        </div>

        <div className="col-9 col-md-10 p-4 container d-flex flex-column align-items-center">
          <h1>Aktualne Wypozyczenia</h1>
          <div className="row">
            {borrowings.map((borrowing) => (
              <BorrowingCard
                key={borrowing.id}
                id={borrowing.id}
                borrowingDate={borrowing.dataWypozyczenia}
                returnDate={borrowing.dataZwrotu}
                reader={borrowing.czytelnik}
                book={borrowing.ksiazka}
                employee={borrowing.pracownik}
                onDelete={handleOnDelete}
                onReturn={handleOnReturn}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Borrowings;
