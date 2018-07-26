import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Slider} from '../../components/Slider/CoursedySlider';
import data from '../../configs/data.json';
import CoursedySlider from "../../components/Slider/CoursedySlider";
import {TT} from "../../utils/locale";
import CommentIcon from "../../components/Core/Icons/CommentIcon";


const Item = ({item}) => {
  return (
    <div className="slick-slide_item">
      <div className="row">
        <div className="col-md-4 slick-sl
        ide_item__content">
          <div className="comment-icon">
            <CommentIcon fillColor="#FF7F45"></CommentIcon>
          </div>
          <div className="user__avatar-left">
            <img src={item.user.avatar}/>
          </div>
        </div>
        <div className="col-md-8 user">
          <div className="d-flex flex-column">
            <div className="student-comment">
              <span>{TT.t(item.comment.content)}</span>
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

    const comments = [
      {
        "id" : 1,
        "comment": {
          "content": "first_student_comment"
        },
        "user": {
          "id": 1,
          "avatar": "/doanquocbao.png",
          "full_name": "Đoàn Quốc Bảo",
          "job": "Nhân Viên Văn Phòng"
        }
      }, {
        "id": 2,
        "comment": {
          "content": "second_student_comment"
        },
        "user": {
          "id": 2,
          "avatar": "/nguyenthianhthu.png",
          "full_name": "Nguyễn Thi Ánh Thu",
          "job": "Phụ Huynh"
        }
      }
    ];

    return (
      <section className="course__student-comment">
        <div className="container course__student-comment__content-wrap">
          <div className="section-content-wrapper">
            <div className='col-sm-12'>
              <h2 className="heading"
                  dangerouslySetInnerHTML={{__html: this.context.t('student_top_comments')}}/>
              <div>
                {
                  <CoursedySlider items={comments.map((item, index) => {
                      return <Item item={item} key={index}/>;
                    })} numOfSlideToShow={2} isLimit={false}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}


export default StudentComments;
