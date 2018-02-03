import React from 'react'
import SliderSlick from 'react-slick'
import { defaultSettings } from '../../configs/slider'
import PropTypes from 'prop-types'


export const Slider = (props) => {
  const settings = {...defaultSettings, ...(props.settings || {})}
  return (
    <SliderSlick {...settings}>
      {props.items.map((item, index) => {
        return <div key={index}>{item}</div>
      })}
    </SliderSlick>
  )
}

Slider.propTypes = {
  items: PropTypes.array.isRequired
}
