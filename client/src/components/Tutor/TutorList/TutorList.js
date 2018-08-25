import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './TutorList.module.scss';
import { TutorItem } from '../../index';
import EmptyResultWarning from '../../Core/EmptyResultWarning';

class TutorList extends Component {
  render() {
    const { teachers, isFetching } = this.props;
    if (!isFetching && teachers.length === 0) {
      return (
        <div className="d-flex flex-auto justify-content-center">
          <EmptyResultWarning searchType="search_teachers" {...this.props} />
        </div>
      );
    }
    return (
      <div className="row">
        {
          isFetching ? <div/> :
          teachers.map((tutor) => {
            return (
              <div className="col-md-3 col-sm-6" key={tutor.id}>
                <TutorItem tutor={tutor} />
              </div>
            );
          })
        }
      </div>
    );
  }
}

TutorList.contextTypes = {
  t: React.PropTypes.func.isRequired
};

TutorList.propTypes = {
};

export default cssModules(TutorList, styles);
