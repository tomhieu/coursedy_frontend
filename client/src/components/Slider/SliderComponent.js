import React from 'react'
import { defaultSettings } from '../../configs/slider'
import PropTypes from 'prop-types'


export const Slider = (props) => {
  const settings = {...defaultSettings, ...(props.settings || {})}
  return (
    <div className='row'>
      {props.items.map((item, index) => {
        return <div className='col-sm-4 col-xs-12' key={index}>{item}</div>
      })}
    </div>
  )
}

Slider.propTypes = {
  items: PropTypes.array.isRequired
}
