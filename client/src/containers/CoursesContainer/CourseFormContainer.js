import React, { Component } from 'react';
import { CourseForm } from '../../components/index';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';

class CourseFormContainer extends Component {
  createCourse({title}) {
    // this.props.dispatch(Action.loginUser(title));
  }

  render() {
    return (
      <CourseForm onSubmit={this.createCourse.bind(this)} {...this.props}/>
    );
  }
}

CourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  CourseFormComponent: state.CourseFormComponent
});

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'course',
  fields: ['title']
})(CourseFormContainer));
