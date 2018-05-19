import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Slider} from '../../components/Slider/CoursedySlider';
import data from '../../configs/data.json';
import CoursedySlider from "../../components/Slider/CoursedySlider";


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

    const comments = [
      {
        "id" : 1,
        "comment": {
          "content": "This was great! I highly recommend her to anybody! Very nice and patient and straight to."
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
          "content": "This was great! I highly recommend her to anybody! Very nice and patient and straight to."
        },
        "user": {
          "id": 2,
          "avatar": "/nguyenthianhthu.png",
          "full_name": "Nguyễn Thi Ánh Thu",
          "job": "Phụ Huynh"
        }
      }, {
        "id": 3,
        "comment": {
          "content": "This was great! I highly recommend her to anybody! Very nice and patient and straight to."
        },
        "user": {
          "id": 3,
          "avatar": "/lequochung.png",
          "full_name": "Lê Tuấn Hưng",
          "job": "Học Sinh"
        }
      },
      {
        "id" : 1,
        "comment": {
          "content": "This was great! I highly recommend her to anybody! Very nice and patient and straight to."
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
          "content": "This was great! I highly recommend her to anybody! Very nice and patient and straight to."
        },
        "user": {
          "id": 2,
          "avatar": "/nguyenthianhthu.png",
          "full_name": "Nguyễn Thi Ánh Thu",
          "job": "Phụ Huynh"
        }
      }, {
        "id": 3,
        "comment": {
          "content": "This was great! I highly recommend her to anybody! Very nice and patient and straight to."
        },
        "user": {
          "id": 3,
          "avatar": "/lequochung.png",
          "full_name": "Lê Tuấn Hưng",
          "job": "Học Sinh"
        }
      }
    ];

    return (
      <section className="course__student-comment">
        <div className="container course__student-comment__content-wrap">
          <div className="row row-padding">
            <div className='col-sm-12'>
              <h2 className="heading"
                  dangerouslySetInnerHTML={{__html: this.context.t('student_top_comments')}}/>
              <div>
                {
                  <CoursedySlider items={comments.map((item, index) => {
                      return <Item item={item} key={index}/>;
                    })}
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
