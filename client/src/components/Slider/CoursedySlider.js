import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick';
import cssModules from 'react-css-modules';
import styles from './CoursedySlider.module.scss';


class CoursedySlider extends Component {
  render() {
    let {numOfSlideToShow, items, isLimit = true} = this.props;

    if (!numOfSlideToShow) {
      numOfSlideToShow = items.length > 5 ? 5 : items.length;
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: numOfSlideToShow,
      slidesToScroll: 5,
      className: 'coursedy-slider',
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: numOfSlideToShow - 2 > 0 ? numOfSlideToShow - 2 : 1,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: numOfSlideToShow - 3 > 0 ? numOfSlideToShow - 3 : 1,
            slidesToScroll: numOfSlideToShow - 3 > 0 ? numOfSlideToShow - 3 : 1,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: numOfSlideToShow - 4 > 0 ? numOfSlideToShow - 4 : 1,
            slidesToScroll: numOfSlideToShow - 4 > 0 ? numOfSlideToShow - 4 : 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: numOfSlideToShow - 5 > 0 ? numOfSlideToShow - 5 : 1,
            slidesToScroll: numOfSlideToShow - 5 > 0 ? numOfSlideToShow - 5 : 1
          }
        }
      ]
    };
    const sliderContainerClasses = isLimit ? [styles.itemLimitContainer] : [styles.itemContainer];
    return (
      <Slider {...settings}>
        {
          items.map((item, index) => {
            return <div className={sliderContainerClasses.join(' ')} key={index}>{item}</div>
          })
        }
      </Slider>
    );
  }
}

CoursedySlider.propTypes = {
  items: PropTypes.array.isRequired,
  numOfSlideToShow: PropTypes.number,
  isLimit: PropTypes.bool
}

export default cssModules(CoursedySlider, styles);
