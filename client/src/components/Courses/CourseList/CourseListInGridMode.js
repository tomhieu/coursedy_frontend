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
    const columnClasses = {
      '6': 'col-xs-12 col-sm-3 col-md-2',
      '4': 'col-xs-12 col-sm-6 col-md-3',
      '2': 'col-xs-12 col-sm-12 col-md-6',
      '1': 'col-xs-12 col-sm-12 col-md-12'
    }
    return (
      <div className="d-flex flex-horizontal flex-wrap justify-content-center">
      {
        this.props.courses.map((item, index) => (
          <div className="d-flex course-item-wrapper" key={'course-' +index}>
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
