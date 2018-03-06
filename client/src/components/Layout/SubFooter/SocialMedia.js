import React from 'react'

const SocialMedia = (props) => {
  return (
    <div className={props.classNames}>
      <div className="social-media">
        <ul>
          <li><a href="#"><i className="fa fa-facebook"></i></a></li>
          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
          <li><a href="#"><i className="fa fa-skype"></i></a></li>
          <li><a href="#"><i className="fa fa-youtube"></i></a></li>
          <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
        </ul>
      </div>
    </div>
  )
}

SocialMedia.contextTypes = {
  t: React.PropTypes.func.isRequired
};

export default SocialMedia
