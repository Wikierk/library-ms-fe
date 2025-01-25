import { Link } from "react-router-dom";
import "./pages.css";
const Home = () => {
  return (
    <div className="container p-5 ">
      <h1 className="text-center mb-4">System Zarządzania Biblioteką</h1>
      <div className="list-group">
        <Link
          to="/books"
          className="list-group-item list-group-item-action text-center fs-3 fw-bold"
        >
          Zarządzaj Książkami
        </Link>
        <Link
          to="/employees"
          className="list-group-item list-group-item-action text-center fs-3 fw-bold"
        >
          Zarządzaj Pracownikami
        </Link>
        <Link
          to="/readers"
          className="list-group-item list-group-item-action text-center fs-3 fw-bold"
        >
          Zarządzaj Czytelnikami
        </Link>
        <Link
          to="/borrowings"
          className="list-group-item list-group-item-action text-center fs-3 fw-bold"
        >
          Zarządzaj Wypożyczeniami
        </Link>
        <Link
          to="/reports"
          className="list-group-item list-group-item-action text-center fs-3 fw-bold"
        >
          Raporty
        </Link>
      </div>
    </div>
  );
};

export default Home;
