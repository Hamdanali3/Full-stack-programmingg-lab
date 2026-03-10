import './App.css';
import CourseItem from './CourseItem';

const courses = [
  { courseName: "Full Stack Development", instructor: "Dr. Ahmad", duration: "16 Weeks", type: "Offline" },
  { courseName: "Artificial Intelligence", instructor: "Dr. Fatima", duration: "16 Weeks", type: "Offline" },
  { courseName: "Web Development", instructor: "Prof. Usman", duration: "12 Weeks", type: "Online" },
  { courseName: "Data Structures", instructor: "Dr. Hassan", duration: "16 Weeks", type: "Offline" },
  { courseName: "Machine Learning", instructor: "Dr. Ayesha", duration: "14 Weeks", type: "Online" },
];

function App() {
  return (
    <div className="App">
      <h1>Course List</h1>
      <div className="course-container">
        {courses.map((course, index) => (
          <CourseItem
            key={index}
            courseName={course.courseName}
            instructor={course.instructor}
            duration={course.duration}
            type={course.type}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
