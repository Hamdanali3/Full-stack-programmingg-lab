import './App.css';
import Greeting from './Greeting';

function App() {
  return (
    <div className="App">
      <h1>Dynamic Greeting App</h1>
      <div className="greeting-container">
        <Greeting name="Ali" timeOfDay="morning" bgColor="#fff9c4" />
        <Greeting name="Musharaf" timeOfDay="afternoon" bgColor="#c8e6c9" />
        <Greeting name="Sara" timeOfDay="evening" bgColor="#bbdefb" />
      </div>
    </div>
  );
}

export default App;
