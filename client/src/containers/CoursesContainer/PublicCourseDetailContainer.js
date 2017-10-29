import React, { Component } from 'react';
import { CourseDetail } from '../../components/index';
import * as Action from '../../actions/CourseActionCreator';
import { connect } from 'react-redux';

class PublicCourseDetailContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(Action.fetchCourse({id: this.props.id}))
  }

  render() {
    return (
      <CourseDetail item={this.props.item} />
    )
  }
}

PublicCourseDetailContainer.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PublicCourseDetailContainer.propTypes = {

};

const mapStateToProps = (state) => ({
  item: state.CourseDetailReducer.course
});

export default connect(
  mapStateToProps
)(PublicCourseDetailContainer);
