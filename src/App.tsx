import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Employees from "./pages/Employees";
import Readers from "./pages/Readers";
import Borrowings from "./pages/Borrowings";
import Reports from "./pages/Reports";
import FormPage from "./pages/FormPage";
import Borrowing from "./pages/Borrowing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/readers" element={<Readers />} />
        <Route path="/borrowings" element={<Borrowings />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/borrowing/:id" element={<Borrowing />} />
        <Route
          path="/formPage/book"
          element={<FormPage formType="bookForm" />}
        />
        <Route
          path="/formPage/editBook/:id"
          element={<FormPage formType="bookEditForm" />}
        />
        <Route
          path="/formPage/reader"
          element={<FormPage formType="readerForm" />}
        />
        <Route
          path="/formPage/editReader/:id"
          element={<FormPage formType="readerEditForm" />}
        />
        <Route
          path="/formPage/employee"
          element={<FormPage formType="employeeForm" />}
        />
        <Route
          path="/formPage/editEmployee/:id"
          element={<FormPage formType="employeeEditForm" />}
        />
        <Route
          path="/formPage/borrowing"
          element={<FormPage formType="borrowingAdder" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
