import React from 'react'


export const MediaCard = ({ title, description }) => {
  return (
    <div className="advantage">
      <div className="media-body">
        <h4 dangerouslySetInnerHTML={{ __html: title }}/>
        <p>{description}</p>
      </div>
    </div>
  )
}
