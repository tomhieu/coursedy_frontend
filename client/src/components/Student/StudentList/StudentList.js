import React, {Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './StudentList.module.scss';

class StudentList extends Component {
  render() {
    return (
      <div class="row flex-auto">
        <div class="col-xl-5 col-lg-5 col-md-6 col-sm-12">
          <div class="row">
            <div class="col-md-9 col-sm-9">
            </div>
            <div class="col-md-3 col-sm-3">
              <div class="header-small-title">
                <span></span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-7 col-lg-7 col-md-6 col-sm-12">
          <div class="row">
            <div class="col-xl-5 col-md-2 col-sm-4 header-small-title">
              <div class="row">
                <div class="col-xl-4 col-md-12">
                  <span></span>
                </div>
                <div class="col-xl-8 col-md-0 col-sm-12">
                  <span></span>
                </div>
              </div>
            </div>
            <div class="col-xl-7 col-md-10 col-sm-8">
              <div class="row">
                <div class="col-md-3 col-sm-3 header-kpi">
                  <span></span>
                </div>
                <div class="col-md-3 col-sm-3 header-kpi ">
                  <span></span>
                </div>
                <div class="col-md-2 col-sm-2 header-kpi">
                  <span></span>
                </div>
                <div class="col-md-4 col-sm-4 header-kpi">
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

StudentList.contextTypes = {
  t: React.PropTypes.func.isRequired
}

StudentList.propTypes = {
  // the public course will have some additional feature like following
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(StudentList, styles);