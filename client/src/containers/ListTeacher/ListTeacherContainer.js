import React, { Component } from 'react';
import { connect } from "react-redux";
import SearchSectionContainer from './SearchSectionContainer';
import PublicTeacherListContainer from './PublicTeacherListContainer';
import './ListTeacher.scss'


class ListTeacher extends Component {
  render() {
    return (
      <div className="content">
        <SearchSectionContainer />
        <PublicTeacherListContainer />
      </div>
    )
  }
}

export default connect()(ListTeacher);
