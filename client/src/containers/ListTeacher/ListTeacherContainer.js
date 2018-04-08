import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeacherFilterContainer from './TeacherFilterContainer';
import PublicTeacherListContainer from './PublicTeacherListContainer';
import './ListTeacher.scss';


class ListTeacher extends Component {
  render() {
    return (
      <div className="container">
        <TeacherFilterContainer/>
        <PublicTeacherListContainer/>
      </div>
    );
  }
}


export default connect()(ListTeacher);
