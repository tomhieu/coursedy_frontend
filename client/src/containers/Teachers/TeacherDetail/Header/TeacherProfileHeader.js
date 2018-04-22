import React from 'react';
import { Link } from 'react-router-dom';
import RatingItem from 'components/Rating'

// todo:
/*
* default avatar
*
* */
const TeacherProfileHeader = (props) => {
  const { teacher } = props
  if (!teacher.user) { return null }
  return (
    <div className="d-flex flex-column flex-sm-column flex-md-row flex-lg-row teacher-detail-profile-header">
      <div className="profile-picture">
        <img src={teacher.user.avatar} />
      </div>
      <div className="profile-summary">
        <RatingItem num_stars={teacher.star_average || 0} num_reviews={teacher.reviews && teacher.reviews.headers.xTotal || 0}/>
        <h3><Link to="#">{teacher.user.name}</Link></h3>
        <p>{teacher.title}</p>

        <TeacherCategories categories={teacher.categories}/>
        {teacher.twitter || teacher.linkedIn ? <div className="social">
          {teacher.twitter ? <a href={teacher.twitter} className="twitter"
                                data-toggle="tooltip" data-placement="top"
                                title="" data-original-title="Twitter"><i className="fa fa-twitter"></i></a> : null}
          {teacher.linkedIn ? <a href={teacher.linkedIn} className="linked"
                                 data-toggle="tooltip" data-placement="top"
                                 title="" data-original-title="LinkedIn"><i className="fa fa-linkedin"></i></a> : null}
        </div> : null}
      </div>
    </div>
  )
}

// Todo
// define category link
const TeacherCategories = ({categories}) => {
  return (
    <div className="categories mb-20">
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
