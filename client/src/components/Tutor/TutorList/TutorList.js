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
          <EmptyResultWarning searchType="search_teacher" {...this.props} />
        </div>
      );
    }
    return (
      <div className="row">
        {
          isFetching ? <div />
            : teachers.map((tutor) => {
              return (
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-15" key={tutor.id}>
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
