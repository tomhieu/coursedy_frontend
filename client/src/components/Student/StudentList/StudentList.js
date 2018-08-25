import React, { Component } from 'react';
import cssModules from 'react-css-modules';
import styles from './StudentList.module.scss';

class StudentList extends Component {
  render() {
    return (
      <div className="row flex-auto">
        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
          <div className="row">
            <div className="col-md-9 col-sm-9" />
            <div className="col-md-3 col-sm-3">
              <div className="header-small-title">
                <span />
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12">
          <div className="row">
            <div className="col-xl-5 col-md-2 col-sm-4 header-small-title">
              <div className="row">
                <div className="col-xl-4 col-md-12">
                  <span />
                </div>
                <div className="col-xl-8 col-md-0 col-sm-12">
                  <span />
                </div>
              </div>
            </div>
            <div className="col-xl-7 col-md-10 col-sm-8">
              <div className="row">
                <div className="col-md-3 col-sm-3 header-kpi">
                  <span />
                </div>
                <div className="col-md-3 col-sm-3 header-kpi ">
                  <span />
                </div>
                <div className="col-md-2 col-sm-2 header-kpi">
                  <span />
                </div>
                <div className="col-md-4 col-sm-4 header-kpi" />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

StudentList.contextTypes = {
  t: React.PropTypes.func.isRequired
};

StudentList.propTypes = {
  // the public course will have some additional feature like following
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(StudentList, styles);
