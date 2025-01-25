import axios from "axios";
import { useForm } from "react-hook-form";

const ReaderForm = () => {
  const { register, handleSubmit, reset } = useForm();

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
      const response = await axios.post("/api/readers", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Reader added successfully:", response.data);
      alert("Czytelnik został dodany pomyślnie!");
      reset({
        name: "",
        lastName: "",
        phone: "",
        email: "",
      });
      reset({});
    } catch (error) {
      console.error("Error adding reader:", error);
      console.log(requestData);
      alert(`Wystąpił błąd podczas dodawania czytelnika.`);
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
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default ReaderForm;
