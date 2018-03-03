import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider } from '../../components/Slider/SliderComponent';
import data from '../../configs/data.json';


const Item = ({ item }) => {
  return (
    <div className="slick-slide_item">
      <div className="">
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
            <p>{item.comment.content}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xs-12 col-md-12 col-sm-12">
            <img src={item.user.avatar}/>
            <strong>{item.user.full_name}</strong>
            <span>{item.user.job}</span>
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
          <div className="row-margin">
            <h2 className="heading"
                dangerouslySetInnerHTML={{ __html: this.context.t('student_top_comments') }}/>
            <div>
              {<Slider settings={{ slidesToShow: 3, slidesToScroll: 3 }}
                       items={data.studentComments.map((item, index) => {
                         return <Item item={item} key={index}/>;
                       })}
              />}
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default StudentComments;
