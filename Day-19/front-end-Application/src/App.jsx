import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import DisplayStudents from "./DisplayStudents";
import AddStudent from "./AddStudent";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ol>
            <li>
              <Link to="/">Display Students</Link>
            </li>
            <li>
              <Link to="/add-student">Add Student</Link>
            </li>
          </ol>
        </nav>
        <Routes>
          <Route path="/" element={<DisplayStudents />} />
          <Route path="/add-student" element={<AddStudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
