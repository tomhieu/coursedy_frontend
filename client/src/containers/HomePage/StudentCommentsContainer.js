import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Slider} from '../../components/Slider/SliderComponent';
import data from '../../configs/data.json';


const Item = ({item}) => {
  return (
    <div className="slick-slide_item">
      <div className="">
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12 slick-slide_item__content">
            <p>{item.comment.content}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12 user">
            <div className="user__avatar-left">
              <img src={item.user.avatar}/>
            </div>
            <div className="user__info-right">
              <div className="user__fullname">{item.user.full_name}</div>
              <div className="user__job">{item.user.job}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


class StudentComments extends Component {
  static contextTypes = {
    t: PropTypes.func.isRequired
  };

  render() {
    if (!data.studentComments.length) {
      return null;
    }

    return (
      <section className="course__student-comment">
        <div className="container course__student-comment__content-wrap">
          <div className="row row-padding">
            <div className='col-sm-12'>
              <h2 className="heading"
                  dangerouslySetInnerHTML={{__html: this.context.t('student_top_comments')}}/>
              <div>
                {<Slider
                         items={data.studentComments.map((item, index) => {
                           return <Item item={item} key={index}/>;
                         })}
                />}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default StudentComments;
