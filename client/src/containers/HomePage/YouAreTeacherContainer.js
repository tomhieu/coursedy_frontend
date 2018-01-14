import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

export default class YouAreTeacher extends Component {
  static propTypes = {
    utilities: PropTypes.array.isRequired
  }

  static defaultProps = {
    utilities: [
      {
        id: 1,
        description: 'Tiết kiệm chi phí mở lớp học. Tất cả những gì cần thiết chỉ bao gồm một máy tính có kết nối mạng.',
        icon: 'https://www.shareicon.net/data/128x128/2015/09/11/99442_glasses_512x512.png'
      },
      {
        id: 2,
        description: 'Thời gian linh động, giáo viên có thể linh động sắp xếp thời gian cho khoá học. Và không tốn thời gian di chuyển.',
        icon: 'https://www.shareicon.net/data/128x128/2015/09/11/99442_glasses_512x512.png'
      },
      {
        id: 3,
        description: 'Tiếp cần mạng lưới học sinh rộng lớn từ khắp mọi nơi.',
        icon: 'https://www.shareicon.net/data/128x128/2015/09/11/99442_glasses_512x512.png'
      }
    ]
  }

  renderUtilities() {
    let { utilities } = this.props
    return utilities.map((item) => {
      return (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" key={ item.id }>
          <div className="panel panel-default">
            <div className="panel-body">
              <Link to={'#'}>
                <img src={ item.icon } alt=""/>
              </Link>
              <div>{ item.description }</div>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <section className="container row-margin teacher-guide">
        <div className="row">
          <h2 className="heading">Bạn Là Giáo Viên?</h2>
        </div>
        <div className="row">
          <p className="text-center">Và đang tìm kiếm một nơi để dạy online tốt. Ezylearning chính là nơi lý tưởng để bạn thực hiện điều đó.</p>
          <p className="text-center">Hãy {<Link to={'/dang-ky'}>đăng kí</Link>} làm giáo viên tại Ezylearning.</p>
        </div>
        <div className="row">
          { this.renderUtilities() }
        </div>
      </section>
    )
  }
}
