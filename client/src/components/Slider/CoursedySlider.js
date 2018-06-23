import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick';
import cssModules from 'react-css-modules';
import styles from './CoursedySlider.module.scss';


class CoursedySlider extends Component {
  render() {
    const {numOfSlideToShow = 6} = this.props;
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: numOfSlideToShow,
      slidesToScroll: 1,
      className: 'coursedy-slider',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    const {items} = this.props;
    return (
      <Slider {...settings}>
        {
          items.map((item, index) => {
            return <div className={styles.itemContainer} key={index}>{item}</div>
          })
        }
      </Slider>
    );
  }
}

CoursedySlider.propTypes = {
  items: PropTypes.array.isRequired,
  numOfSlideToShow: PropTypes.number
}

export default cssModules(CoursedySlider, styles);
