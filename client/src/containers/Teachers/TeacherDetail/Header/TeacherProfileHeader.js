import React from 'react'
import { Link } from 'react-router-dom'
import RatingItem from 'components/Rating'
import defaultAvatar from '../../../../../images/default_avatar.png'

const TeacherProfileHeader = (props) => {
  const { teacher, specializes } = props
  if (!teacher.user) { return null }
  return (
    <div className="teacher-detail-profile-header">
      <div className="profile-picture mb-10">
        <img src={teacher.user.avatar ? teacher.user.avatar : defaultAvatar} />
      </div>
      <div className="profile-summary">
        <h3>{teacher.user.name}</h3>
        <div className="mb-5">{teacher.title}</div>

        <TeacherCategories categories={specializes}/>
        {teacher.twitter || teacher.linkedIn ? <div className="social">
          {teacher.twitter ? <a href={teacher.twitter} className="twitter"
                                data-toggle="tooltip" data-placement="top"
                                title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a> : null}
          {teacher.linkedIn ? <a href={teacher.linkedIn} className="linked"
                                 data-toggle="tooltip" data-placement="top"
                                 title="" data-original-title="LinkedIn"><i className="fa fa-linkedin"></i></a> : null}
        </div> : null}
        <RatingItem num_stars={(teacher.user.rating_points/teacher.user.rating_count) || 0} num_reviews={teacher.user.rating_counts || 0}/>
      </div>
    </div>
  )
}

const TeacherCategories = ({categories}) => {
  return (
    <div className="categories mb-5">
      {
        categories.map((category) => {
          return (
            <Link className="category" to="#" key={category.id}>
              {category.name}
            </Link>
          )
        })
      }
    </div>
  )
}

export default TeacherProfileHeader
