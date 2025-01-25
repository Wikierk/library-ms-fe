import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Position } from "../interfaces/Position";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeEditForm = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const { register, handleSubmit, reset, control } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await axios.get(`/api/employees/${id}`);
        const employeeData = employeeResponse.data;
        reset({
          name: employeeData.imie,
          lastName: employeeData.nazwisko,
          salary: employeeData.pensja,
          position: {
            value: employeeData.stanowisko.id,
            label: employeeData.stanowisko.nazwa,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Nie udało się załadować danych pracowników.");
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    const requestData = {
      imie: data.name,
      nazwisko: data.lastName,
      pensja: Number(data.salary),
      stanowisko: data.position.value,
    };
    try {
      const response = await axios.put(`/api/employees/${id}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("employee edited successfully:", response.data);
      navigate("/employees");
    } catch (error) {
      console.error("Error editing employee:", error);
      console.log(requestData);
      alert(`Wystąpił błąd podczas edytowania pracownika.`);
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
          Edytuj
        </button>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
