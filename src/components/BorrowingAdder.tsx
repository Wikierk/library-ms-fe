import axios from "axios";
import { useEffect, useState } from "react";
import { Reader } from "../interfaces/Reader";
import ReaderInfoCard from "./ReaderInfoCard";
import { Book } from "../interfaces/Book";
import BookInfoCard from "./BookInfoCard";
import { Employee } from "../interfaces/Employee";
import EmployeeInfoCard from "./EmployeeInfoCard";
import "./components.css";
const BorrowingAdder = () => {
  const [readers, setReaders] = useState<Reader[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [activeReader, setActiveReader] = useState<string | null>(null);
  const handleReaderClick = (readerId: string) => {
    setActiveReader((prev) => (prev === readerId ? null : readerId));
  };
  const [activeBook, setActiveBook] = useState<string | null>(null);
  const handleBookClick = (bookId: string) => {
    setActiveBook((prev) => (prev === bookId ? null : bookId));
  };
  const [activeEmployee, setActiveEmployee] = useState<string | null>(null);
  const handleEmployeeClick = (employeeId: string) => {
    setActiveEmployee((prev) => (prev === employeeId ? null : employeeId));
  };
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

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/api/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const onAdd = async (data: {
    readerId: string | null;
    bookId: string | null;
    employeeId: string | null;
  }) => {
    if (data.readerId && data.bookId && data.employeeId) {
      const requestData = {
        czytelnikId: data.readerId,
        ksiazkaId: data.bookId,
        pracownikId: data.employeeId,
      };
      try {
        const response = await axios.post("/api/borrowings", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("borrowing added successfully:", response.data);
        alert("Wypożyczenie zostało dodane pomyślnie!");
        setActiveBook(null);
        setActiveEmployee(null);
        setActiveReader(null);
      } catch (error) {
        console.error("Error adding borrowing:", error);
        console.log(requestData);
        alert(`Wystąpił błąd podczas dodawania wypożyczenia.`);
      }
    } else {
      alert(`Wybierz wszystkie karty`);
    }
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="p-3 border bg-light">
            {" "}
            {readers.map((reader) => (
              <ReaderInfoCard
                key={reader.id}
                id={reader.id}
                name={reader.imie}
                lastName={reader.nazwisko}
                registrationDate={reader.dataRejestracji}
                phoneNumber={reader.telefon}
                email={reader.email}
                type="infoChooser"
                isActive={activeReader === reader.id}
                onCardClick={handleReaderClick}
              />
            ))}
          </div>
        </div>
        <div className="col">
          <div className="p-3 border bg-light">
            {books.map((book) => (
              <BookInfoCard
                title={book.tytul}
                authors={book.autorzy}
                genres={book.gatunki}
                language={book.jezyk}
                coverUrl={book.okladkaUrl}
                id={book.id}
                type="infoChooser"
                isActive={activeBook === book.id}
                onCardClick={handleBookClick}
              />
            ))}
          </div>
        </div>
        <div className="col">
          <div className="p-3 border bg-light">
            {employees.map((employee) => (
              <EmployeeInfoCard
                id={employee.id}
                name={employee.imie}
                lastName={employee.nazwisko}
                salary={employee.pensja}
                position={employee.stanowisko}
                dateOfEmployment={employee.dataZatrudnienia}
                type="infoChooser"
                isActive={activeEmployee === employee.id}
                onCardClick={handleEmployeeClick}
              />
            ))}
          </div>
        </div>
        <div className="col">
          {activeBook && activeReader && activeEmployee && (
            <button
              className="btn btn-primary"
              onClick={() =>
                onAdd({
                  readerId: activeReader,
                  bookId: activeBook,
                  employeeId: activeEmployee,
                })
              }
            >
              Dodaj Wypożyczenie
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowingAdder;
