import React, { Component } from 'react'
import LoadingMask from '../../../../components/LoadingMask/LoadingMask'


class TeacherBackground extends Component {
  render() {
    return (
      <div className="teacher-detail__content__background">
        <div className="mb-20">
          <h3>{this.context.t('teacher_background')}</h3>
        </div>
        <TeacherShortIntroduce {...this.props} context={this.context}/>
        <TeacherEducation {...this.props} context={this.context}/>
        <TeacherDegrees {...this.props} context={this.context}/>
        <TeacherWorkExperience {...this.props} context={this.context}/>
      </div>
    )
  }
}


const TeacherShortIntroduce = (props) => {
  return (
    <LoadingMask placeholderId="userAccountPlaceholder"
                 normalPlaceholder={false}
                 facebookPlaceholder={true}
                 loaderType="USER_ACCOUNT_PLACEHOLDER">
      {props.teacher.description ? <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-user"></i></span>
        </div>
        <h4>{props.context.t('teacher_short_introduce')}</h4>
        <p>{props.teacher.description}</p>
      </div> : null}
    </LoadingMask>
  )
}

const TeacherEducation = (props) => {
  return (
    <LoadingMask placeholderId="userAccountPlaceholder"
                 normalPlaceholder={false}
                 facebookPlaceholder={true}
                 loaderType="USER_ACCOUNT_PLACEHOLDER">
      {
        props.teacher.educations && props.teacher.educations.length ?
          <div className="profile-list-item">
            <div className="icon">
              <span><i className="fa fa-graduation-cap"></i></span>
            </div>
            <h4>{props.context.t('teacher_education')}</h4>
            <ul className="the-list">
              {props.teacher.educations.map((education, index) => {
                return (
                  <li key={index}>
                    <h6>{education.title}</h6>
                    <span className="block mb-10"><span
                      className="text-primary">{education.graduated_from}</span> - <span
                      className="font-italic">year {education.end_date}</span></span>
                    <p>{education.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
          :null
      }
    </LoadingMask>
  )
}

const TeacherDegrees = (props) => {
  const { degrees } = props.teacher
  return (
    <LoadingMask placeholderId="userAccountPlaceholder"
                 normalPlaceholder={false}
                 facebookPlaceholder={true}
                 loaderType="USER_ACCOUNT_PLACEHOLDER">
      {
        degrees && degrees.length ?
          <div className="profile-list-item">
            <div className="icon">
              <span><i className="fa fa-briefcase"></i></span>
            </div>
            <h4>{props.context.t('teacher_degrees')}</h4>
            {degrees.map((degree, index) => {
              return (
                <div className="row mb-10" key={index}>
                  <div className="col-sm-2">
                    <img src={'http://66.175.219.194' + degree.url} width="auto"
                         height="30"/>
                  </div>
                  <div className="col-sm-7">{degree.name}</div>
                </div>
              )
            })}
          </div>
          :null
      }
    </LoadingMask>
  )
}

const TeacherWorkExperience = (props) => {
  const { workExperiences } = props.teacher
  return (
    <LoadingMask placeholderId="userAccountPlaceholder"
                 normalPlaceholder={false}
                 facebookPlaceholder={true}
                 loaderType="USER_ACCOUNT_PLACEHOLDER">
      {
        workExperiences && workExperiences.length ?
          <div className="profile-list-item">
            <div className="icon">
              <span><i className="fa fa-briefcase"></i></span>
            </div>
            <h4>{props.context.t('teacher_experience')}</h4>
            <ul className="the-list">
              {workExperiences.map((experience, index) => {
                return (
                  <li key={index}>
                    <h6>{experience.title}</h6>
                    <span className="block mb-10"><span
                      className="text-primary">{experience.company}</span> - <span
                      className="font-italic">year {experience.start_date}
                      - {experience.end_date}</span></span>
                    <p>{experience.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>: null
      }
    </LoadingMask>
  )
}


TeacherBackground.contextTypes = {
  t: React.PropTypes.func.isRequired
}

TeacherBackground.defaultProps = {
  qualifications: [], experiences: [], awards: [], interest: ''
}

TeacherBackground.propTypes = {
  qualifications: React.PropTypes.array,
  experiences: React.PropTypes.array,
  awards: React.PropTypes.array,
  interest: React.PropTypes.string
}

export default TeacherBackground
