import React, {Component, PropTypes} from 'react';
import {TRIGGER_DISPLAY_FIX_HEADER_BAR_OFFSET} from "constants/WebConstants";

class RightContent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrolled: false,
    }
    this.onScroll = this.checkScrollPosition.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll)
    window.scrollTo(0, 0)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }

  checkScrollPosition() {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop
    if (TRIGGER_DISPLAY_FIX_HEADER_BAR_OFFSET < currentPosition) {
      this.setState({
        scrolled: true
      })
    } else {
      this.setState({
        scrolled: false
      })
    }
  }

  render() {
    let onScrollTopMargin = this.props.onScrollTopMargin || 0;
    return (
      <div className='right-content'>
        {this.props.children}
      </div>
    )
  }
}

RightContent.propTypes = {
  onScrollTopMargin: React.PropTypes.number
}


export default RightContent;
