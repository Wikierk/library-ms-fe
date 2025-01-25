import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useEffect, useState } from "react";
import { Book } from "../interfaces/Book";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
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

  const handleCoverChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    bookId: string
  ) => {
    const formData = new FormData();
    if (event.target.files) {
      formData.append("file", event.target.files[0]);
      formData.append("bookId", bookId);

      try {
        const response = await axios.post("/api/books/upload-cover", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const updatedBooks = books.map((book) =>
          book.id === bookId
            ? { ...book, okladkaUrl: response.data.photoUrl }
            : book
        );
        setBooks(updatedBooks);
      } catch (error) {
        console.error("Error uploading cover:", error);
        alert("Wystąpił błąd przy dodawaniu okładki.");
      }
    }
  };

  const handleOnDelete = async (bookId: string) => {
    try {
      await axios.delete(`/api/books/${bookId}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Wystąpił błąd podczas usuwania książki.");
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
            <Link to="/formPage/book" className="nav-link">
              Dodaj Książkę
            </Link>
            <Link to="/" className="nav-link">
              Powrót
            </Link>
          </nav>
        </div>

        <div className="col-9 col-md-10 p-4 container d-flex flex-column align-items-center">
          <h1>Dostępne Książki</h1>
          <div className="row">
            {books.map((book) => (
              <BookCard
                title={book.tytul}
                authors={book.autorzy}
                genres={book.gatunki}
                language={book.jezyk}
                coverUrl={book.okladkaUrl}
                id={book.id}
                onCoverChange={handleCoverChange}
                onDelete={handleOnDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
