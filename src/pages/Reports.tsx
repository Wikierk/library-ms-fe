import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BorrowingsStats } from "../interfaces/BorrowingsStats";
import { MostBorrowedBook } from "../interfaces/MostBorrowedBook";
import { HighestPaidEmployee } from "../interfaces/HighestPaidEmployee";
import { MostBorrowings } from "../interfaces/MostBorrowings";

const Reports = () => {
  const [borrowingsStats, setBorrowingsStats] = useState<BorrowingsStats[]>([]);
  const [mostBorrowedBook, setMostBorrowedBook] = useState<MostBorrowedBook[]>(
    []
  );
  const [highestPaidEmployee, setHighestPaidEmployee] = useState<
    HighestPaidEmployee[]
  >([]);
  const [mostBorrowingsReaders, setMostBorrowingsReaders] = useState<
    MostBorrowings[]
  >([]);
  const [mostBorrowingsEmployees, setMostBorrowingsEmployees] = useState<
    MostBorrowings[]
  >([]);
  const [showBorrowingsStats, setShowBorrowingsStats] = useState(false);
  const [showMostBorrowedBook, setShowMostBorrowedBook] = useState(false);
  const [showHighestPaidEmployee, setShowHighestPaidEmployee] = useState(false);
  const [showMostBorrowingsReaders, setShowMostBorrowingsReaders] =
    useState(false);
  const [showMostBorrowingsEmployees, setShowMostBorrowingsEmployees] =
    useState(false);
  const handleBorrowingsStatsButtonClick = () => {
    setShowBorrowingsStats(true);
    setShowMostBorrowedBook(false);
    setShowHighestPaidEmployee(false);
    setShowMostBorrowingsEmployees(false);
    setShowMostBorrowingsReaders(false);
  };
  const handleMostBorrowedButtonClick = () => {
    setShowBorrowingsStats(false);
    setShowMostBorrowedBook(true);
    setShowHighestPaidEmployee(false);
    setShowMostBorrowingsEmployees(false);
    setShowMostBorrowingsReaders(false);
  };
  const handleHighestPaidEmployeeButtonClick = () => {
    setShowBorrowingsStats(false);
    setShowMostBorrowedBook(false);
    setShowHighestPaidEmployee(true);
    setShowMostBorrowingsEmployees(false);
    setShowMostBorrowingsReaders(false);
  };
  const handleMostBorrowingsReadersButtonClick = () => {
    setShowBorrowingsStats(false);
    setShowMostBorrowedBook(false);
    setShowHighestPaidEmployee(false);
    setShowMostBorrowingsEmployees(false);
    setShowMostBorrowingsReaders(true);
  };
  const handleMostBorrowingsEmployeesButtonClick = () => {
    setShowBorrowingsStats(false);
    setShowMostBorrowedBook(false);
    setShowHighestPaidEmployee(false);
    setShowMostBorrowingsEmployees(true);
    setShowMostBorrowingsReaders(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reports/borrowing-stats");
        setBorrowingsStats(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Nie udało się załadować danych wypożyczeń.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reports/most-borrowed-book");
        setMostBorrowedBook(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(
          "Nie udało się załadować danych najczęściej wypożyczanej książki."
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reports/highest-paid-employee");
        setHighestPaidEmployee(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert(
          "Nie udało się załadować danych najlepiej zarabiającego pracownika."
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reports/top-readers");
        setMostBorrowingsReaders(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Nie udało się załadować danych najlepszych czytelników.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/reports/top-employees");
        setMostBorrowingsEmployees(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Nie udało się załadować danych najlepszych pracowników.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-3 col-md-2 bg-light border-end"
          style={{ minHeight: "100vh", height: "auto" }}
        >
          <nav className="nav flex-column p-3">
            <button
              className="nav-link"
              onClick={handleBorrowingsStatsButtonClick}
            >
              Statystyki Wypożyczeń
            </button>
            <button
              className="nav-link"
              onClick={handleMostBorrowedButtonClick}
            >
              Najczęściej Wypożyczana Książka
            </button>
            <button
              className="nav-link"
              onClick={handleHighestPaidEmployeeButtonClick}
            >
              Najlepiej Opłacany Pracownik
            </button>
            <button
              className="nav-link"
              onClick={handleMostBorrowingsReadersButtonClick}
            >
              Top Czytelnicy
            </button>
            <button
              className="nav-link"
              onClick={handleMostBorrowingsEmployeesButtonClick}
            >
              Top Pracownicy
            </button>
            <Link to="/" className="nav-link">
              Powrót
            </Link>
          </nav>
        </div>

        <div className="col-9 col-md-10 p-4 container d-flex flex-column align-items-center">
          <h1>Raporty</h1>
          {showBorrowingsStats && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tytuł Książki</th>
                  <th scope="col">Liczba Wypożyczeń</th>
                  <th scope="col">Średni Czas Wypożyczenia</th>
                </tr>
              </thead>
              {borrowingsStats.map((stat, index) => (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{stat.bookTitle}</td>
                    <td>{stat.totalBorrowings}</td>
                    <td>{stat.avgBorrowingDuration}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}

          {showMostBorrowedBook && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tytuł Książki</th>
                  <th scope="col">Liczba Wypożyczeń</th>
                </tr>
              </thead>
              {mostBorrowedBook.map((stat, index) => (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{stat.BOOKTITLE}</td>
                    <td>{stat.TOTALBORROWINGS}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
          {showHighestPaidEmployee && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Imię</th>
                  <th scope="col">Nazwisko</th>
                  <th scope="col">Pensja</th>
                </tr>
              </thead>
              {highestPaidEmployee.map((stat, index) => (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{stat.firstName}</td>
                    <td>{stat.lastName}</td>
                    <td>{stat.salary}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
          {showMostBorrowingsReaders && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Imię</th>
                  <th scope="col">Nazwisko</th>
                  <th scope="col">Liczba Wypożyczeń</th>
                </tr>
              </thead>
              {mostBorrowingsReaders.map((stat, index) => (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{stat.firstName}</td>
                    <td>{stat.lastName}</td>
                    <td>{stat.totalBorrowings}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
          {showMostBorrowingsEmployees && (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Imię</th>
                  <th scope="col">Nazwisko</th>
                  <th scope="col">Liczba Wypożyczeń</th>
                </tr>
              </thead>
              {mostBorrowingsEmployees.map((stat, index) => (
                <tbody>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{stat.firstName}</td>
                    <td>{stat.lastName}</td>
                    <td>{stat.totalBorrowings}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
