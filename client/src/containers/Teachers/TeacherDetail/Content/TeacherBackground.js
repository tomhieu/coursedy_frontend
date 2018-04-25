import React, { Component } from 'react'


class TeacherBackground extends Component {
  render() {
    return (
      <div className="teacher-detail__content__background">
        { this.header() }
        { this.shortIntroduce() }
        { this.education() }
        { this.workExperience() }
      </div>
    )
  }

  header() {
    return (
      <div className="mb-20">
        <h3>{this.context.t('teacher_background')}</h3>
      </div>
    )
  }

  shortIntroduce() {
    if (!this.props.teacher.description) { return null }
    return (
      <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-user"></i></span>
        </div>
        <h4>{this.context.t('teacher_short_introduce')}</h4>
        <p>{this.props.teacher.description}</p>
      </div>
    )
  }

  education() {
    if (!this.props.teacher.qualifications || !this.props.teacher.qualifications.length) { return null }
    return (
      <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-graduation-cap"></i></span>
        </div>
        <h4>{this.context.t('teacher_education')}</h4>
        <ul className="the-list">
          { this.props.teacher.qualifications.map((qualification, index) => {
            return (
              <li key={index}>
                <h6>{qualification.degree_name}</h6>
                <span className="block mb-10"><span className="text-primary">{qualification.school.name}</span> - <span className="font-italic">year {qualification.graduation_year}</span></span>
                <p>{qualification.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  certifications() {
    return (
      <div>

      </div>
    )
  }

  workExperience() {
    const { experiences } = this.props.teacher
    if (!experiences || !experiences.length) { return null }
    return (
      <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-briefcase"></i></span>
        </div>
        <h4>{this.context.t('teacher_experience')}</h4>
        <ul className="the-list">
          {experiences.map((experience, index) => {
            return (
              <li key={index}>
                <h6>{experience.job_title}</h6>
                <span className="block mb-10"><span className="text-primary">{experience.company.name}</span> - <span className="font-italic">year {experience.year_work}</span></span>
                <p>{experience.description}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}


TeacherBackground.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TeacherBackground.defaultProps = {
  qualifications: [],
  experiences: [],
  awards: [],
  interest: ''
}

TeacherBackground.propTypes = {
  qualifications: React.PropTypes.array,
  experiences: React.PropTypes.array,
  awards: React.PropTypes.array,
  interest: React.PropTypes.string,
}

export default TeacherBackground
