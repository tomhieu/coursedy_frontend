import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

export default class HowToLearn extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired
  }

  static defaultProps = {
    list: [
      {
        id: 1,
        name: 'TÌM KHOÁ HỌC',
        description: 'Search for online tutoring. Need help with your search? Request a tutor and we’ll have tutors contact you very soon!',
        icon: 'https://www.shareicon.net/data/128x128/2015/09/11/99442_glasses_512x512.png'
      },
      {
        id: 2,
        name: 'XEM NỘI DUNG KHOÁ HỌC',
        description: 'Read feedback and ratings from parents and students. Detailed tutor profiles also include photos more.',
        icon: 'https://www.shareicon.net/data/128x128/2015/09/11/99442_glasses_512x512.png'
      },
      {
        id: 3,
        name: 'ĐĂNG KÝ LỊCH HỌC',
        description: 'Communicate directly with tutors to find a time that works for you. Whether you need a single lesson.',
        icon: 'https://www.shareicon.net/data/128x128/2015/09/11/99442_glasses_512x512.png'
      },
      {
        id: 4,
        name: 'THAM GIA HỌC',
        description: 'One-on-one instruction is the most effective way to learn. Let us handle payments and administrative details.',
        icon: 'https://www.shareicon.net/data/128x128/2015/09/11/99442_glasses_512x512.png'
      }
    ]
  }

  renderItem(item) {
    return(
      <div className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3" key={ item.id }>
          <div className="item-group">
            <Link className="item-group__heading-icon" to={'#'} title={ item.name } >
              <img src={ item.icon } alt={ item.name }/>
            </Link>
            <strong className="item-group__title">{ item.name }</strong>
            <div className="item-group__description">{ item.description }</div>
          </div>
      </div>
    )
  }

  renderCheckList() {
    let { list } = this.props
    let _this = this

    return(
      <section className="row">
        { list.map((item) => {
          return _this.renderItem(item)
        })}
      </section>
    )
  }

  render() {
    return (
      <section className="course__how-to-learn">
        <div className="container course__how-to-learn__content-wrap">
          <div className="row-margin">
            <div className="course__how-to-learn__heading">
              <h2 className="heading" dangerouslySetInnerHTML={{__html: this.context.t('how_study')}} />
            </div>
            { this.renderCheckList() }
          </div>
        </div>
      </section>
    )
  }
}

HowToLearn.contextTypes = {
  t: React.PropTypes.func.isRequired
}
