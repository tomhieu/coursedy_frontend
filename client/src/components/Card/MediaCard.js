import React from 'react'


export const MediaCard = ({ title, description, iconName }) => {
  return (
    <div className="advantage">
      <div className="media-body">
        <div className="d-flex flex-row align-items-center mb-15">
          <div className={iconName + "-icon"}></div>
          <h4 dangerouslySetInnerHTML={{ __html: title }}/>
        </div>
        <div className="seperator"></div>
        <p>{description}</p>
      </div>
    </div>
  )
}
