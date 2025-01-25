import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const ReaderEditForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const readerResponse = await axios.get(`/api/readers/${id}`);
        const readerData = readerResponse.data;
        reset({
          name: readerData.imie,
          lastName: readerData.nazwisko,
          phone: readerData.telefon,
          email: readerData.email,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Nie udało się załadować danych czytelnika.");
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    let requestData;
    data.phone
      ? (requestData = {
          imie: data.name,
          nazwisko: data.lastName,
          telefon: data.phone,
          email: data.email,
        })
      : (requestData = {
          imie: data.name,
          nazwisko: data.lastName,
          email: data.email,
        });
    try {
      const response = await axios.put(`/api/readers/${id}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Reader edited successfully:", response.data);

      navigate("/readers");
    } catch (error) {
      console.error("Error editing reader:", error);
      console.log(requestData);
      alert(`Wystąpił błąd podczas edytowania czytelnika.`);
    }
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nameLabel">Imie</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
            placeholder="Wprowadź Imie"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastNameLabel">Nazwisko</label>
          <input
            type="text"
            className="form-control"
            {...register("lastName", { required: true })}
            placeholder="Wprowadź Nazwisko"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneLabel">Telefon</label>
          <input
            type="text"
            className="form-control"
            {...register("phone", { required: false })}
            placeholder="Telefon"
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailLabel">Email</label>
          <input
            type="text"
            className="form-control"
            {...register("email", { required: true })}
            placeholder="Email"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary m-3">
          Edytuj
        </button>
      </form>
    </div>
  );
};

export default ReaderEditForm;
