import './App.css';
import React,{useState} from 'react';
import UseEffect from './component/UseEffect';

function App() {
  const [toggle, setToggle]= useState(false)

  return (
    <div className="container">
    <button onClick={()=>setToggle(!toggle)}>toogle Componennt</button>
    {toggle && <UseEffect/>}
    </div>
  );
}

export default App;
