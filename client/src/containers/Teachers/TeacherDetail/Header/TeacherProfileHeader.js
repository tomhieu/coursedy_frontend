import React from 'react'
import defaultAvatar from '../../../../../images/default_avatar.png'
import cssModules from 'react-css-modules';
import styles from '../TeacherDetail.module.scss';


class TeacherProfileHeader  extends React.Component {
  render() {
    const { teacher } = this.props
    if (!teacher.user) { return null }

    return (
      <div className="teacher-detail-profile-header">
        <div className="profile-picture mb-10">
          <img src={teacher.user.avatar ? teacher.user.avatar : defaultAvatar} />
        </div>
        <div className="profile-summary">
          <div className="profile-box">
            <h3>{teacher.user.name}</h3>
          </div>
          <div className="profile-box">
            <span>{teacher.country}</span>
            <span className={`${teacher.country ? ' vertical-slash': ''}`}>{teacher.title || this.context.t('teacher_job_title_is_updating')}</span>
          </div>
          <hr className={styles.hr}/>
          <div className="profile-box">
            <div className="teacher-short-experience">
              {teacher.short_experience}
            </div>
          </div>
          <div className="profile-box">
              {!teacher.twitter && !teacher.linkedIn && this.context.t('content_is_updating')}
            {teacher.twitter || teacher.linkedIn ? <div className="social">
              {teacher.twitter ? <a href={teacher.twitter} className="twitter"
                                    data-toggle="tooltip" data-placement="top"
                                    title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a> : null}
              {teacher.linkedIn ? <a href={teacher.linkedIn} className="linked"
                                     data-toggle="tooltip" data-placement="top"
                                     title="" data-original-title="LinkedIn"><i className="fa fa-linkedin"></i></a> : null}
            </div> : null}
            {
              teacher.categories && teacher.categories.length ?
                <TeacherCategories categories={teacher.categories}/>
                : <div>{this.context.t('specializes_is_updating')}</div>
            }
          </div>
        </div>
      </div>
    )
  }
}

TeacherProfileHeader.contextTypes = {
  t: React.PropTypes.func.isRequired
}

class TeacherCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showMore: true}
  }

  toggleShowMore() {
    this.setState({showMore: !this.state.showMore})
  }

  render() {
    if (!this.props.categories || !this.props.categories.length) {
      return null
    }

    let categories = this.state.showMore ?
      this.props.categories.slice(0, 2) :
      this.props.categories
    let display = categories.map((category) => {
      return (
        <span className="category" key={category.id}>
              {category.name}
            </span>
      )
    })

    return (
      <div className="mb-10 mt-10">
        <div className="categories">
          {display}
        </div>
        <div className="see-more" onClick={this.toggleShowMore.bind(this)}>
          {this.state.showMore && this.props.categories.length > 2 ? this.context.t('see_more') : ''}
          {!this.state.showMore && this.props.categories.length > 2 ? this.context.t('see_less') : ''}
        </div>
      </div>
    )
  }
}

TeacherCategories.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default cssModules(TeacherProfileHeader, styles)
