import React, { Component } from 'react';
import { CourseFilter } from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';

class CourseFilterContainer extends Component {
  componentWillMount(){
    this.props.dispatch(Actions.fetchCategories());
    this.props.dispatch(Actions.fetchLocations());
  }

  onCategoryChange(e){
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

    this.props.dispatch(Actions.reloadCourseLevels(selectedValues))
  }

  render(){
    return (
      <CourseFilter {...this.props}
                    onCategoryChange={this.onCategoryChange.bind(this)}
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
  selectedCategoryIds: state.CourseFilter.selectedCategoryIds
});


export default connect(
  mapStateToProps
)(CourseFilterContainer)
