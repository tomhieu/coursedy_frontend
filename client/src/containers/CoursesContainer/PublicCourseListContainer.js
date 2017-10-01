import React, { Component } from 'react';
import { CourseList } from '../../components/index';
import * as Action from '../../actions/CourseActionCreator';
import { connect } from 'react-redux';

class PublicCourseListContainer extends Component {

  componentDidMount() {
    this.props.dispatch(Action.fetchCourses({}))
  }

  render() {
    return (
      <CourseList {...this.props} />
    )
  }
}

PublicCourseListContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseListContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  list: state.CourseComponent.courses
});

export default connect(
  mapStateToProps
)(PublicCourseListContainer);
