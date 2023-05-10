/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
    <div>
      <p>There are no campuses. Try adding one using the button below!</p>
      <Link to={`newCampus`}>
        <button>Add New Campus</button>
      </Link>
    </div>
    );
  }
  

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <img src={campus.imageurl}/>
          <p>{campus.description}</p>
          <button onClick={() => props.deleteCampus(campus.id)}>Delete Campus</button>
          <Link to={`/editCampus/${campus.id}`}>
            <button>Edit This Campus</button>
          </Link>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newCampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  deleteCampus: PropTypes.func.isRequired,
};

export default AllCampusesView;