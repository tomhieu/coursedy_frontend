import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Slider } from '../../components/Slider/CoursedySlider';
import CoursedySlider from '../../components/Slider/CoursedySlider';
import { TT } from '../../utils/locale';
import CommentIcon from '../../components/Core/Icons/CommentIcon';


const Item = ({ item, context }) => {
  return (
    <div className="slick-slide_item">
      <div className="row">
        <div className="col-md-4 slick-sl
        ide_item__content"
        >
          <div className="comment-icon">
            <CommentIcon fillColor="#FF7F45" />
          </div>
          <div className="user__avatar-left">
            <img src={item.user.avatar} alt="" />
          </div>
        </div>
        <div className="col-md-8 user">
          <div className="d-flex flex-column">
            <div className="student-comment">
              <span>{context.t(item.comment.content)}</span>
            </div>
            <div className="user__info-right">
              <div className="user__fullname">{item.user.full_name}</div>
              <div className="user__job">{context.t(item.user.job)}</div>
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
    const comments = [
      {
        id: 1,
        comment: {
          content: 'first_student_comment'
        },
        user: {
          id: 1,
          avatar: '/doanquocbao.png',
          full_name: 'Đoàn Quốc Bảo',
          job: 'office_staff'
        }
      }, {
        id: 2,
        comment: {
          content: 'second_student_comment'
        },
        user: {
          id: 2,
          avatar: '/nguyenthianhthu.png',
          full_name: 'Nguyễn Thi Ánh Thu',
          job: 'bk_student'
        }
      }
    ];

    return (
      <section className="course__student-comment">
        <div className="container course__student-comment__content-wrap">
          <div className="section-content-wrapper">
            <div className="col-sm-12">
              <h2
                className="heading"
                dangerouslySetInnerHTML={{ __html: this.context.t('student_top_comments') }}
              />
              <div>
                {
                  <CoursedySlider
                    items={comments.map((item, index) => {
                      return <Item item={item} key={`student-comment-${index}`} context={this.context} />;
                    })}
                    numOfSlideToShow={2}
                    isLimit={false}
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
