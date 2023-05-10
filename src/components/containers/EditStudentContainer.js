/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: props.student.firstname, 
      lastname: props.student.lastname, 
      campusId: props.student.campusId,
      email: props.student.email,
      imageurl: props.student.imageurl,
      gpa: props.student.gpa, 
      submitted: false
    };
  }

  componentDidMount() {
    // Get student ID from URL (API link)
    this.props.fetchStudent(this.props.match.params.id);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { student } = this.props;
    const { firstname, lastname, campusId, email, imageurl, gpa } = this.state;

    const editedStudent = {
      id: student.id,
      firstname,
      lastname,
      campusId, 
      email, 
      imageurl, 
      gpa
    };

    this.props.editStudent(editedStudent);
    this.setState({
      submitted: true
    });
  }

  render() {
    const { student } = this.props;
    const { firstname, lastname, campusId, email, imageurl, gpa, submitted } = this.state;

    if (submitted) {
      return <Redirect to={`/student/${student.id}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          firstname={firstname}
          lastname={lastname}
          campusId={campusId}
          email={email}
          imageurl={imageurl}
          gpa={gpa}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student))
  };
};

export default connect(mapState, mapDispatch)(EditStudentContainer);