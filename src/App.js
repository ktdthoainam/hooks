import './App.css';
import TwoWayBinding from './components/TwoWayBinding';
import UseState from './components/UseState';
import TwoWayBindingFormSubmit3 from './components/TwoWayBindingFormSubmit';
import InitStateCallback from './components/InitStateCallback';
import PlayListApp from './components/PlayList/PlayListApp';

function App() {
  return (
    <div className="container">
      {/* <UseState/> */}
      {/* <TwoWayBindingFormSubmit3/> */}
      {/* <InitStateCallback/> */}
      <PlayListApp/>
    </div>
  );
}

export default App;
