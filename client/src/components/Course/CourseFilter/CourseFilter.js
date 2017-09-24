import React, { Component} from 'react';
import {Form} from 'react-bootstrap'
import cssModules from 'react-css-modules';
import styles from './CourseFilter.module.scss';
import Select2 from 'react-select2-wrapper'

class CourseFilter extends Component {
  render() {
    return (
      <div className="row row-margin">
        <div className="margin-btm">
          <div className="col-xs-12 col-sm-12">
            <div className="col-xs-12 col-sm-12 course-filter">
              <Form action="#" id="filter_form" method="post">
                <div className="col-md-4">
                  <label htmlFor="">Khóa học</label>
                  <Select2
                    data={[
                      {text: 'C++ Programming', id: 'c-programming'},
                      {text: 'Java Programming (5)', id: 'java-programming'},
                      {text: 'Adobe Photoshop (7)', id: 'adobe-photoshop'}

                    ]}
                    multiple
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="">Gia sư</label>
                  <Select2
                    data={[
                      { text: 'Los Angeles', id: 'los-angeles' },
                      { text: 'San Diego', id: 'san-diego' }
                    ]}
                    multiple
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="">Địa điểm</label>
                  <Select2
                    data={[
                      {text: 'C++ Programming', id: 'c-programming'},
                      {text: 'Java Programming (5)', id: 'java-programming'},
                      {text: 'Adobe Photoshop (7)', id: 'adobe-photoshop'}
                    ]}
                    multiple
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

CourseFilter.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseFilter.propTypes = {
  // content: PropTypes.string.isRequired,
  // onRemove: PropTypes.func.isRequired,
  // id: PropTypes.number.isRequired
};

export default cssModules(CourseFilter, styles);
