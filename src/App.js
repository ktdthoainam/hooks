import "./App.css";
import { Route, Routes } from "react-router-dom";
import StudentList from "./Students/StudentList";
import StudentDetail from "./Students/StudentDetail";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/teacher" element={<StudentList />} />
        <Route path="/teacher/:teacherId" element={<StudentDetail />} />
      </Routes>
    </div>
  );
}

export default App;
