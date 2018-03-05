import React from 'react'
import data from '../../../configs/data.json';

const CopyRight = (props) => {
  return (
    <div className={props.classNames}>
      <div className="copy-right">
        <p>Copyright © <span className="year">{data.copy_right_year}</span> {data.copy_right_title}</p>
      </div>
    </div>
  )
}

CopyRight.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default CopyRight
