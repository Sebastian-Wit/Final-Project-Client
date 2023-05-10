/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */

import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.campus.name,
      address: props.campus.address,
      description: props.campus.description,
      imageurl: props.campus.imageurl,
      submitted: false
    };
  }

  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { campus } = this.props;
    const { name, address, description, imageurl } = this.state;

    const editedCampus = {
      id: campus.id,
      name,
      address,
      description,
      imageurl
    };

    this.props.editCampus(editedCampus);
    this.setState({
      submitted: true
    });
  }

  render() {
    const { campus } = this.props;
    const { name, address, description, imageurl, submitted } = this.state;

    if (submitted) {
      return <Redirect to={`/campus/${campus.id}`} />;
    }

    return (
      <div>
        <Header />
        <EditCampusView
          name={name}
          address={address}
          description={description}
          imageurl={imageurl}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus))
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);