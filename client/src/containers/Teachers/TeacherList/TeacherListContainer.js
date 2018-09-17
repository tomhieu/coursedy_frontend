import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeacherFilterContainer from './TeacherFilterContainer';
import PublicTeacherListContainer from './PublicTeacherListContainer';
import './TeacherList.scss';
import PageContainer from '../../../utils/PageContainer';


class TeacherListContainer extends Component {
  render() {
    return (
      <PageContainer>
        <div className="d-flex flex-auto flex-vertical teacher-list-container">
          <TeacherFilterContainer />
          <PublicTeacherListContainer />
        </div>
      </PageContainer>
    );
  }
}


export default connect()(TeacherListContainer);
