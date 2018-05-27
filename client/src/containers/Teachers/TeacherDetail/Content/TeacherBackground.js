import React, { Component } from 'react'
import LoadingMask from '../../../../components/LoadingMask/LoadingMask'
import * as webConstants from '../../../../constants/WebConstants'


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
                 loaderType={webConstants.USER_ACCOUNT_PLACEHOLDER}>
      <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-user"></i></span>
        </div>
        <h4>{props.context.t('teacher_short_introduce')}</h4>
        <p>{props.teacher.description || <i>{props.context.t('content_is_updating')}</i>}</p>
      </div>
    </LoadingMask>
  )
}

const TeacherEducation = (props) => {
  return (
    <LoadingMask placeholderId="userAccountPlaceholder"
                 normalPlaceholder={false}
                 facebookPlaceholder={true}
                 loaderType={webConstants.USER_ACCOUNT_PLACEHOLDER}>

      <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-graduation-cap"></i></span>
        </div>
        <h4>{props.context.t('teacher_education')}</h4>
        {
          props.teacher.educations && props.teacher.educations.length ?
            <ul className="the-list">
              {
                props.teacher.educations.map((education) => {
                  return <EducationItem education={education} key={education.id} />
                })
              }
            </ul>
            : <i>{props.context.t('content_is_updating')}</i>
        }
      </div>
    </LoadingMask>
  )
}

const TeacherDegrees = (props) => {
  const { degrees } = props.teacher
  return (
    <LoadingMask placeholderId="userAccountPlaceholder"
                 normalPlaceholder={false}
                 facebookPlaceholder={true}
                 loaderType={webConstants.USER_ACCOUNT_PLACEHOLDER}>
      <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-briefcase"></i></span>
        </div>
        <h4>{props.context.t('teacher_degrees')}</h4>
        {degrees && degrees.length ? degrees.map((degree) => {
          return <DegreeItem degree={degree} key={degree.id}/>
        }) : <i>{props.context.t('content_is_updating')}</i>
        }
      </div>
    </LoadingMask>
  )
}

const TeacherWorkExperience = (props) => {
  const { workExperiences } = props.teacher
  return (
    <LoadingMask placeholderId="userAccountPlaceholder"
                 normalPlaceholder={false}
                 facebookPlaceholder={true}
                 loaderType={webConstants.USER_ACCOUNT_PLACEHOLDER}>
      <div className="profile-list-item">
        <div className="icon">
          <span><i className="fa fa-briefcase"></i></span>
        </div>
        <h4>{props.context.t('teacher_experience')}</h4>
        {
          workExperiences && workExperiences.length ?
            <ul className="the-list">
              {workExperiences.map((experience) => {
                return <WorkExperienceItem experience={experience} key={experience.id} />
              })}
            </ul>
            : <i>{props.context.t('content_is_updating')}</i>
        }
      </div>
    </LoadingMask>
  )
}

const EducationItem = ({education}) => {
  return (
    <li key={education.id}>
      <h6>{education.title}</h6>
      <span className="block mb-10"><span
        className="text-primary">{education.graduated_from}</span> - <span
        className="font-italic">year {education.end_date}</span></span>
      <p>{education.description}</p>
    </li>
  )
}

const DegreeItem = ({degree}) => {
  return(
    <div className="row mb-10" key={degree.id}>
      <div className="col-sm-2">
        <img src={degree.url} width="auto"
             height="30"/>
      </div>
      <div className="col-sm-7">{degree.name}</div>
    </div>
  )
}

const WorkExperienceItem = ({experience}) => {
 return(
   <li key={experience.id}>
     <h6>{experience.title}</h6>
     <span className="block mb-10"><span
       className="text-primary">{experience.company}</span> - <span
       className="font-italic">year {experience.start_date}
       - {experience.end_date}</span></span>
     <p>{experience.description}</p>
   </li>
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
