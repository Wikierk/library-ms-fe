import { Link } from "react-router-dom";
import BookForm from "../components/BookForm";
import BookEditForm from "../components/BookEditForm";
import ReaderForm from "../components/ReaderForm";
import ReaderEditForm from "../components/ReaderEditForm";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeEditForm from "../components/EmployeeEditForm";
import BorrowingAdder from "../components/BorrowingAdder";

interface props {
  formType:
    | "bookForm"
    | "bookEditForm"
    | "readerForm"
    | "readerEditForm"
    | "employeeForm"
    | "employeeEditForm"
    | "borrowingAdder";
}

const FormPage = ({ formType }: props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 col-md-2 bg-light vh-100 border-end">
          <nav className="nav flex-column p-3">
            <Link
              to={
                formType === "bookForm" || formType === "bookEditForm"
                  ? "/books"
                  : formType === "readerForm" || formType === "readerEditForm"
                  ? "/readers"
                  : formType === "employeeForm" ||
                    formType === "employeeEditForm"
                  ? "/employees"
                  : formType === "borrowingAdder"
                  ? "/borrowings"
                  : ""
              }
              className="nav-link"
            >
              Powrót
            </Link>
          </nav>
        </div>

        <div className="col-9 col-md-10 p-4 container d-flex flex-column align-items-center">
          {formType === "bookForm" ? (
            <BookForm />
          ) : formType === "bookEditForm" ? (
            <BookEditForm />
          ) : formType === "readerForm" ? (
            <ReaderForm />
          ) : formType === "readerEditForm" ? (
            <ReaderEditForm />
          ) : formType === "employeeForm" ? (
            <EmployeeForm />
          ) : formType === "employeeEditForm" ? (
            <EmployeeEditForm />
          ) : formType === "borrowingAdder" ? (
            <BorrowingAdder />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
