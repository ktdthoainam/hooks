import React,{useState} from "react";
// const [state,setState] = UseState(initState)

function UseState() {
  const [number, setNumber] = useState(0);
  const handleIncreament =() =>{
    setNumber(number+1)
  }
  const handleDescreament =() =>{
      setNumber(number-1)
  }
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={handleDescreament}>Descreament</button>
      <button onClick={handleIncreament}>Increament</button>
    </div>
  );
}
// const UseState = () =>{
//     return(
//         <div>
//             <h1>Learning UseState</h1>
//         </div>
//     )
// }
export default UseState;
