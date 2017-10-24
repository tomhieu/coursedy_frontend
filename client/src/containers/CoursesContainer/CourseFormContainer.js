import React, { Component } from 'react';
import { CourseForm } from '../../components/index';
import * as Actions from '../../actions/CourseFormActionCreator'
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {validate} from '../../validations/CourseFormValidation'

class CourseFormContainer extends Component {
  createCourse({title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image}) {
    this.props.dispatch(Actions.createCourse(title, description, start_date, end_date, number_of_students, period, period_type, tuition_fee, currency, cover_image));
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
  fields: ['title', 'description', 'start_date', 'end_date', 'number_of_students', 'period', 'period_type', 'tuition_fee', 'currency', 'cover_image'],
  validate
})(CourseFormContainer));
