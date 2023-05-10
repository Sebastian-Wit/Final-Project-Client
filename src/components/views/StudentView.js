/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <img src={student.imageurl}/>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <Link to={`/campus/${student.campus.id}`}>
        <h2>{student.campus.name}</h2>
      </Link>
      <p>Email: {student.email}</p>
      <p>GPA: {student.gpa}</p>
    </div>
  );

};

export default StudentView;