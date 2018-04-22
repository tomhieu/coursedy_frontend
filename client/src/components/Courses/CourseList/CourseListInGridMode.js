import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from '../Course.module.scss';
import { CourseItem } from '../../index';

/**
  * @Course group template 2
  * @Use for CoursePage
  */
class CourseListInGridMode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      displayMode,
    } = this.props;

    return (
      <div className="row">
      {
        this.props.courses.map((item, index) => (
          <div className="col-xs-12 col-sm-6 col-md-4" key={'course-' +index}>
            <CourseItem item={item}
                        displayMode={displayMode}
            />
          </div>
        ))
      }
        {
          this.props.courses.map((item, index) => (
            <div className="col-xs-12 col-sm-6 col-md-4" key={'course-' +index}>
              <CourseItem item={item}
                          displayMode={displayMode}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

CourseListInGridMode.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseListInGridMode.propTypes = {
  displayMode: React.PropTypes.string.isRequired,
  // the public course list have some additional features like following course...
  isPublic: React.PropTypes.bool.isRequired
};

export default cssModules(CourseListInGridMode, styles);
