function CourseItem(props) {
  return (
    <div className="course-item">
      <h3>{props.courseName}</h3>
      <p><strong>Instructor:</strong> {props.instructor}</p>
      <p><strong>Duration:</strong> {props.duration}</p>
      <span className={`badge ${props.type.toLowerCase()}`}>
        {props.type}
      </span>
    </div>
  );
}

export default CourseItem;
