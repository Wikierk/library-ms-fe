import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReaderInfoCard from "../components/ReaderInfoCard";
import BookInfoCard from "../components/BookInfoCard";
import EmployeeInfoCard from "../components/EmployeeInfoCard";
import { Reader } from "../interfaces/Reader";
import { Book } from "../interfaces/Book";
import { Employee } from "../interfaces/Employee";

const Borrowing = () => {
  const { id } = useParams();
  const [reader, setReader] = useState<Reader>();
  const [book, setBook] = useState<Book>();
  const [employee, setEmployee] = useState<Employee>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const borrowingResponse = await axios.get(`/api/borrowings/${id}`);
        const borrowingData = borrowingResponse.data;

        const readerResponse = await axios.get(
          `/api/readers/${borrowingData?.czytelnik.id}`
        );
        setReader(readerResponse.data);

        const bookResponse = await axios.get(
          `/api/books/${borrowingData?.ksiazka.id}`
        );
        setBook(bookResponse.data);
        console.log(bookResponse.data);

        const employeeResponse = await axios.get(
          `/api/employees/${borrowingData?.pracownik.id}`
        );
        setEmployee(employeeResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Nie udało się załadować wypozyczenia.");
      }
    };

    fetchData();
  }, [id]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-3 col-md-2 bg-light border-end"
          style={{ minHeight: "100vh", height: "auto" }}
        >
          <nav className="nav flex-column p-3">
            <Link to="/borrowings" className="nav-link">
              Powrót
            </Link>
          </nav>
        </div>

        <div className="col-9 col-md-10 p-4 container d-flex flex-column align-items-center">
          <h1>Szczegóły Wypożyczenia: {id}</h1>
          {reader && book && employee ? (
            <div className="row">
              <ReaderInfoCard
                id={reader.id}
                name={reader.imie}
                lastName={reader.nazwisko}
                email={reader.email}
                registrationDate={reader.dataRejestracji}
                type="info"
              />
              <BookInfoCard
                id={book.id}
                title={book.tytul}
                authors={book.autorzy}
                genres={book.gatunki}
                language={book.jezyk}
                coverUrl={book.okladkaUrl}
                type="info"
              />
              <EmployeeInfoCard
                id={employee.id}
                name={employee.imie}
                lastName={employee.nazwisko}
                salary={employee.pensja}
                dateOfEmployment={employee.dataZatrudnienia}
                position={employee.stanowisko}
                type="info"
              />
            </div>
          ) : (
            <p className="text-danger">Nie znaleziono wypozyczenia</p>
          )}

          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default Borrowing;
