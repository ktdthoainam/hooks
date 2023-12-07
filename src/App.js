import './App.css';
import TeacherList from './Teacher/TeacherList';
import {Route, Routes} from 'react-router-dom'
import TeacherDetail from './Teacher/Teacherdetail';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path='/' element= {<TeacherList/>}/>
        <Route path='/teacher' element= {<TeacherList/>}/>
        <Route path='/teacher/:teacherId' element ={<TeacherDetail/>}/>
      </Routes>
          </div>
  );
}

export default App;
