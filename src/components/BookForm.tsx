import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Genre } from "../interfaces/Genre";
import { Language } from "../interfaces/Language";
import { Author } from "../interfaces/Author";

const BookForm = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresResponse = await axios.get("/api/genres");
        const languagesResponse = await axios.get("/api/languages");
        const authorsResponse = await axios.get("/api/authors");
        setGenres(genresResponse.data);
        setLanguages(languagesResponse.data);
        setAuthors(authorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    const requestData = {
      isbn: data.isbn,
      tytul: data.title,
      dataPublikacji: data.date,
      jezykId: data.language.value,
      autorzyId: data.authors.map((author: any) => author.value),
      gatunkiId: data.genres.map((genre: any) => genre.value),
    };
    try {
      const response = await axios.post("/api/books", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Book added successfully:", response.data);
      alert("Książka została dodana pomyślnie!");
      reset({
        isbn: "",
        title: "",
        date: "",
        language: null,
        authors: [],
        genres: [],
        cover: null,
      });
    } catch (error) {
      console.error("Error adding book:", error);
      console.log(requestData);
      alert(`Wystąpił błąd podczas dodawania książki.`);
    }
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="isbnLabel">ISBN</label>
          <input
            type="text"
            className="form-control"
            {...register("isbn", { required: true })}
            placeholder="ISBN"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="titleLabel">Tytuł Książki</label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
            placeholder="Wprowadź tytuł"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateLabel">Data Publikacji</label>
          <input
            type="date"
            className="form-control"
            {...register("date", { required: true })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="languageLabel">Język</label>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={languages.map((lang) => ({
                  value: lang.id,
                  label: lang.nazwa,
                }))}
                required
              />
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genresLabel">Gatunki</label>
          <Controller
            name="genres"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={genres.map((genre) => ({
                  value: genre.id,
                  label: genre.nazwa,
                }))}
                isMulti
                required
              />
            )}
          />
        </div>

        <div className="form-group">
          <label htmlFor="authorsLabel">Autorzy</label>
          <Controller
            name="authors"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={authors.map((author) => ({
                  value: author.id,
                  label: `${author.imie} ${author.nazwisko}`,
                }))}
                isMulti
                required
              />
            )}
          />
        </div>

        <button type="submit" className="btn btn-primary m-3">
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default BookForm;
