import React, { Component } from 'react';
import { CourseForm } from '../../components/index';
import * as FormActions from '../../actions/CourseFormActionCreator'
import * as FilterActions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {validate} from '../../validations/CourseFormValidation'

class CourseFormContainer extends Component {
  componentWillMount() {
    this.props.dispatch(FilterActions.fetchCategories())
  }

  getSelect2Value(e){
    let options = e.target.options
    let optionArray = []

    for(var i = 0; i < options.length; i++){
      optionArray[i] = options[i]
    }

    let selectedValues = optionArray.filter((option) => {
      return option.selected
    }).map((option) => {
      return parseInt(option.value)
    })

    return selectedValues
  }

  onCategoryChange(e){
    this.props.dispatch(FilterActions.reloadCourseLevels(this.getSelect2Value(e)))
  }

  createCourse({
    title, description, 
    category_id, course_level_id,
    start_date, end_date, 
    number_of_students, 
    period, period_type, 
    tuition_fee, currency, cover_image
  }) {
    this.props.dispatch(FormActions.createCourse(
      title, description, 
      category_id, course_level_id,
      start_date, end_date, 
      number_of_students, period, 
      period_type, tuition_fee, 
      currency, cover_image
    ));
  }

  render() {
    return (
      <CourseForm {...this.props} 
            onSubmit={this.createCourse.bind(this)} 
            onCategoryChange={this.onCategoryChange.bind(this)}
      />
    );
  }
}

CourseFormContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFormContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  CourseFormComponent: state.CourseFormComponent,
  categories: state.CourseFilter.categories,
  selectedCategoryIds: state.CourseFilter.selectedCategoryIds,
});

export default connect(
  mapStateToProps
)( reduxForm({
  form: 'course',
  fields: [
    'title', 'description', 
    'category_id', 'course_level_id',
    'start_date', 'end_date', 
    'number_of_students', 'period', 
    'period_type', 'tuition_fee', 
    'currency', 'cover_image'
  ],


  validate
})(CourseFormContainer));
