import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Position } from "../interfaces/Position";

const EmployeeForm = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const positionsResponse = await axios.get("/api/positions");
        setPositions(positionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    const requestData = {
      imie: data.name,
      nazwisko: data.lastName,
      pensja: Number(data.salary),
      stanowisko: data.position.value,
    };
    try {
      const response = await axios.post("/api/employees", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("employee added successfully:", response.data);
      alert("Pracownik został dodany pomyślnie!");
      reset({
        name: "",
        lastName: "",
        salary: 0,
        position: null,
      });
    } catch (error) {
      console.error("Error adding employee:", error);
      console.log(requestData);
      alert(`Wystąpił błąd podczas dodawania pracownika.`);
    }
  };

  return (
    <div className="container-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="nameLabel">Imię</label>
          <input
            type="text"
            className="form-control"
            {...register("name", { required: true })}
            placeholder="Wprowadź Imię"
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
          <label htmlFor="salaryLabel">Pensja</label>
          <input
            type="number"
            defaultValue={0}
            className="form-control"
            {...register("salary", { required: true })}
            placeholder="Wprowadź Pensję"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="positionLabel">Stanowisko</label>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={positions.map((position) => ({
                  value: position.id,
                  label: position.nazwa,
                }))}
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

export default EmployeeForm;
