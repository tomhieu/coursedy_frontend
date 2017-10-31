import React, { Component } from 'react';
import { CourseFilter } from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';

class CourseFilterContainer extends Component {
  componentWillMount(){
    this.props.dispatch(Actions.fetchCategories());
    this.props.dispatch(Actions.fetchLocations());
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
    this.props.dispatch(Actions.reloadCourseLevels(this.getSelect2Value(e)))
  }

  onLocationChange(e){
    this.props.dispatch(Actions.selectCourseLocations(this.getSelect2Value(e)))
  }

  render(){
    return (
      <CourseFilter {...this.props}
                    onCategoryChange={this.onCategoryChange.bind(this)}
                    onLocationChange={this.onLocationChange.bind(this)}
      />
    )
  }
}

CourseFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFilterContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  categories: state.CourseFilter.categories,
  locations: state.CourseFilter.locations,
  selectedCategoryIds: state.CourseFilter.selectedCategoryIds,
  selectedLocationIds: state.CourseFilter.selectedLocationIds
});


export default connect(
  mapStateToProps
)(CourseFilterContainer)
