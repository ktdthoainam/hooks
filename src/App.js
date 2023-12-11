import "./App.css";
import { Route, Routes } from "react-router-dom";
import StudentList from "./Students/StudentList";
import StudentDetail from "./Students/StudentDetail";
import ModifyStudent from "./Students/ModifyStydent";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/student" element={<StudentList />} />
        <Route path={`/student/:studentId`} element={<StudentDetail />} />
        <Route path ="/student/modify/:studentId" element ={<ModifyStudent/>}/>
      </Routes>
    </div>
  );
}

export default App;
