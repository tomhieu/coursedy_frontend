import React, { Component } from 'react';
import { CourseFilter } from '../../components/index';
import * as Actions from '../../actions/CourseFilterActionCreator'
import { connect } from 'react-redux';

class CourseFilterContainer extends Component {
  componentWillMount(){
    this.props.dispatch(Actions.fetchCategory());
  }

  render(){
    return (
      <CourseFilter {...this.props}/>
    )
  }
}

CourseFilterContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFilterContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  categories: state.CourseFilter.categories
});


export default connect(
  mapStateToProps
)(CourseFilterContainer)
