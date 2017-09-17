import React, { Component} from 'react';
import cssModules from 'react-css-modules';
import styles from './CourseGroup.module.scss';

class CourseGroup extends Component {
  render() {
    return (
      <div className="pop-list">
        <a href="http://dev.mindsworthy.com/tutorsci/demo/courses/cscience" className="link-all">See All</a>
        <h3 className="heading-line" title="Computer Science">Computer Science</h3>
        <ul>
          <li><a href="http://dev.mindsworthy.com/tutorsci/demo/search-tutor/software-quality-testing" title="Software Quality&amp;Testing">Software Quality&amp;Testing</a></li>
          <li><a href="http://dev.mindsworthy.com/tutorsci/demo/search-tutor/microsoft-access" title="Microsoft Access">Microsoft Access</a></li>
          <li><a href="http://dev.mindsworthy.com/tutorsci/demo/search-tutor/java-programming" title="Java Programming">Java Programming</a></li>
          <li><a href="http://dev.mindsworthy.com/tutorsci/demo/search-tutor/c-programming" title="C++ Programming">C++ Programming</a></li>
        </ul>
      </div>
    )
  }
}

CourseGroup.contextTypes = {
  t: React.PropTypes.func.isRequired
}

CourseGroup.propTypes = {
};

export default cssModules(CourseGroup, styles);
