import './App.css';
import StudentCard from './StudentCard';

function App() {
  return (
    <div className="App">
      <h1>Student Information Cards</h1>
      <div className="card-container">
        <StudentCard
          name="Ali Ahmed"
          rollNo="FA20-BSE-001"
          department="Software Engineering"
          university="Air University"
          color="#e3f2fd"
        />
        <StudentCard
          name="Musharaf Khan"
          rollNo="FA20-BAI-015"
          department="Artificial Intelligence"
          university="Air University"
          color="#e8f5e9"
        />
        <StudentCard
          name="Sara Malik"
          rollNo="FA20-BCS-032"
          department="Computer Science"
          university="Air University"
          color="#fff3e0"
        />
      </div>
    </div>
  );
}

export default App;
