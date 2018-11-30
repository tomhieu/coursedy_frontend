import React, { Component } from 'react';
import { connect } from 'react-redux';
import TeacherFilterContainer from './TeacherFilterContainer';
import PublicTeacherListContainer from './PublicTeacherListContainer';
import './TeacherList.scss';
import PageContainer from '../../../utils/PageContainer';


class TeacherListContainer extends Component {
  searchQuery(filters, key_word) {
    return {
      q: (typeof key_word !== 'undefined' && key_word) ? key_word : filters.term,
      categories: filters.selectedCategories.map(category => category.id),
      specializes: filters.selectedSpecializes.map(spec => spec.id)
    };
  }

  render() {
    return (
      <PageContainer>
        <div className="d-flex flex-auto flex-vertical teacher-list-container">
          <TeacherFilterContainer searchQuery={this.searchQuery} />
          <PublicTeacherListContainer searchQuery={this.searchQuery} />
        </div>
      </PageContainer>
    );
  }
}


export default connect()(TeacherListContainer);
