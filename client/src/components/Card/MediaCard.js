import React from 'react'


export const MediaCard = ({ imgUrl, title, description }) => {
  return (
    <div className="advantage">
      <div className="media-left">
        <img src={imgUrl} alt=".."/>
      </div>
      <div className="media-body">
        <h4 dangerouslySetInnerHTML={{ __html: title }}/>
        <p>{description}</p>
      </div>
    </div>
  )
}
