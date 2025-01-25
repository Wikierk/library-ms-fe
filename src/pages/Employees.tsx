import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "../interfaces/Employee";
import EmployeeCard from "../components/EmployeeCard";

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
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

  const handleOnDelete = async (employeeId: string) => {
    try {
      await axios.delete(`/api/employees/${employeeId}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== employeeId)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Wystąpił błąd podczas usuwania pracownika.");
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
            <Link to="/formPage/employee" className="nav-link">
              Dodaj Pracownika
            </Link>
            <Link to="/" className="nav-link">
              Powrót
            </Link>
          </nav>
        </div>

        <div className="col-9 col-md-10 p-4 container d-flex flex-column align-items-center">
          <h1>Dostępni Pracownicy</h1>
          <div className="row">
            {employees.map((employee) => (
              <EmployeeCard
                id={employee.id}
                name={employee.imie}
                lastName={employee.nazwisko}
                salary={employee.pensja}
                position={employee.stanowisko}
                dateOfEmployment={employee.dataZatrudnienia}
                onDelete={handleOnDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
