import './App.css';
import {Route, Routes} from 'react-router-dom'
import HomePage from './components/Home/HomePage';
import StudentList from './components/Student/StudentList';
import CreateStudent from './components/Student/CreateStudent';
import Navbar from './components/Layout/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/home' element={<HomePage/>}/>

      <Route path='/student/add' element={<CreateStudent/>}/>
      <Route path='/student/list' element={<StudentList/>}/>

    </Routes>
      
    </>
  );
}

export default App;
