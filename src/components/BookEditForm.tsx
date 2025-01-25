import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { Genre } from "../interfaces/Genre";
import { Language } from "../interfaces/Language";
import { Author } from "../interfaces/Author";

const EditBookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

        const bookResponse = await axios.get(`/api/books/${id}`);
        const bookData = bookResponse.data;
        reset({
          isbn: bookData.isbn,
          title: bookData.tytul,
          date: bookData.dataPublikacji,
          language: {
            value: bookData.jezyk.id,
            label: bookData.jezyk.nazwa,
          },
          authors: bookData.autorzy.map((author: any) => ({
            value: author.id,
            label: `${author.imie} ${author.nazwisko}`,
          })),
          genres: bookData.gatunki.map((genre: any) => ({
            value: genre.id,
            label: genre.nazwa,
          })),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Nie udało się załadować danych książki.");
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    const bookResponse = await axios.get(`/api/books/${id}`);
    const bookData = bookResponse.data;
    try {
      await axios.delete(`/api/books/${id}`);
    } catch (error) {
      alert("Wystąpił błąd podczas edycji książki.");
    }

    const requestData = {
      isbn: data.isbn,
      tytul: data.title,
      dataPublikacji: data.date,
      jezykId: data.language.value,
      autorzyId: data.authors.map((author: any) => author.value),
      gatunkiId: data.genres.map((genre: any) => genre.value),
      okladkaUrl: bookData.okladkaUrl,
    };

    try {
      const response = await axios.post("/api/books", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/books");
    } catch (error) {
      console.log(requestData);
      alert("Wystąpił błąd podczas edycji książki.");
    }
  };

  return (
    <div className="container-sm">
      <h1>Edytuj Książkę</h1>
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
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
};

export default EditBookForm;
