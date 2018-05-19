import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick';
import cssModules from 'react-css-modules';
import styles from './CoursedySlider.module.scss';


class CoursedySlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
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
  items: PropTypes.array.isRequired
}

export default cssModules(CoursedySlider, styles);
