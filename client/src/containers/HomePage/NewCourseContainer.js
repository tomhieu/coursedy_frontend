import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Image from '../../components/Core/ImageComponent';


export default class NewCourse extends Component {
  static propTypes = {
    course: PropTypes.object.isRequired
  }

  static defaultProps = {
    course: {}
  }

  render() {
    const { course } = this.props;

    return (
      <div
        className="slick-slide_item course-group"
        key={course.id}
      >
        <Link className="course-group__content" to="#" title={course.title}>
          <Image
            className="course-group__content__img"
            src={course.cover_image}
            alt={course.title}
          />
          <span className="course-group__content__title">{course.title}</span>
        </Link>
      </div>
    );
  }
}
