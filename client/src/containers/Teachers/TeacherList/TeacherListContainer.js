import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeacherFilterContainer from './TeacherFilterContainer';
import PublicTeacherListContainer from './PublicTeacherListContainer';
import './TeacherList.scss';


class TeacherListContainer extends Component {
  render() {
    return (
      <div className="d-flex flex-auto flex-vertical course-filter-container">
        <TeacherFilterContainer />
        <PublicTeacherListContainer />
      </div>
    );
  }
}


export default connect()(TeacherListContainer);
