import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PrimaryButton from '../../components/Core/PrimaryButton/PrimaryButton';
import SaveMoneyIcon from '../../components/Core/Icons/SaveMoneyIcon';
import FlexibilityTimeIcon from '../../components/Core/Icons/FlexibilityTimeIcon';
import StudentNetworkIcon from '../../components/Core/Icons/StudentNetworkIcon';

export default class YouAreTeacher extends Component {
  static propTypes = {
    utilities: PropTypes.array.isRequired
  }

  static defaultProps = {
    utilities: [
      {
        id: 1,
        icon: <SaveMoneyIcon />,
        description: 'first_benefit'
      },
      {
        id: 2,
        icon: <FlexibilityTimeIcon />,
        description: 'second_benefit'
      },
      {
        id: 3,
        icon: <StudentNetworkIcon />,
        description: 'third_benefit'
      }
    ]
  }

  renderUtilities() {
    const { utilities } = this.props;
    return utilities.map((item) => {
      return (
        <div className="col-12 col-sm-6 col-md-4" key={item.id}>
          <div className="item-group">
            <Link className="item-group__heading-icon" to="#">
              <div className="util-icon">
                {item.icon}
              </div>
            </Link>
            <div className="item-group__description">{ this.context.t(item.description) }</div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="course__teacher-guide">
        <div className="container course__teacher-guide__content-wrap">
          <div className="section-content-wrapper">
            <div className="course__teacher-guide__heading">
              <h2 className="course__teacher-guide__heading__title heading">{this.context.t('your_are_teacher_section_title')}</h2>
              <div className="d-flex flex-column">
                <span className="course__teacher-guide__heading__description">{this.context.t('your_are_teacher_section_sub_title')}</span>
              </div>
            </div>

            <div className="row course__teacher-guide__body">
              { this.renderUtilities() }
            </div>
            <div className="row align-items-center justify-content-center mt-4">
              <div className="col-sm-4 course__footer">
                <Link to="/become-a-teacher">
                  <PrimaryButton type="button" isPrimary round line={false} title={this.context.t('homepage_search_become_teacher')} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

YouAreTeacher.contextTypes = {
  t: React.PropTypes.func.isRequired
};
