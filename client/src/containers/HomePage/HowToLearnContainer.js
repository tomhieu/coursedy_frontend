import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchCourseIcon from '../../components/Core/Icons/SearchCourseIcon';
import CourseSelectionIcon from '../../components/Core/Icons/CourseSelectionIcon';
import ApplyCourseIcon from '../../components/Core/Icons/ApplyCourseIcon';
import TeacherInfoCourseIcon from '../../components/Core/Icons/TeacherInfoCourseIcon';
import CourseTimelineIcon from '../../components/Core/Icons/CourseTimelineIcon';
import LearnCourseIcon from '../../components/Core/Icons/LearnCourseIcon';

export default class HowToLearn extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  static defaultProps = {
    list: [
      {
        id: 1,
        name: 'find_a_course_title',
        description: 'find_a_course_content',
        icon: <SearchCourseIcon />
      },
      {
        id: 2,
        name: 'select_a_course_title',
        description: 'select_a_course_content',
        icon: <CourseSelectionIcon />
      },
      {
        id: 3,
        name: 'apply_a_course_title',
        description: 'apply_a_course_content',
        icon: <ApplyCourseIcon />
      },
      {
        id: 4,
        name: 'receive_course_info_title',
        description: 'receive_course_info_content',
        icon: <TeacherInfoCourseIcon />
      },
      {
        id: 5,
        name: 'get_course_timeline_title',
        description: 'get_course_timeline_content',
        icon: <CourseTimelineIcon />
      },
      {
        id: 6,
        name: 'start_learning_course_title',
        description: 'start_learning_course_content',
        icon: <LearnCourseIcon />
      }
    ]
  }

  renderItem(item) {
    return (
      <div className="col-12 col-md-4 col-xl-4" key={item.id}>
        <div className="item-group">
          <Link className="item-group__heading-icon" to="#" title={this.context.t(item.name)}>
            {item.icon}
          </Link>
          <strong className="item-group__title">{ this.context.t(item.name) }</strong>
          <div className="item-group__description">{ this.context.t(item.description) }</div>
        </div>
      </div>
    );
  }

  renderCheckList() {
    const { list } = this.props;
    const _this = this;

    return (
      <section className="row">
        { list.map((item) => {
          return _this.renderItem(item);
        })}
      </section>
    );
  }

  render() {
    return (
      <section className="course__how-to-learn">
        <div className="container course__how-to-learn__content-wrap">
          <div className="section-content-wrapper">
            <div className="course__how-to-learn__heading">
              <h2 className="heading" dangerouslySetInnerHTML={{ __html: this.context.t('how_study') }} />
            </div>
            { this.renderCheckList() }
          </div>
        </div>
      </section>
    );
  }
}

HowToLearn.contextTypes = {
  t: React.PropTypes.func.isRequired
};
