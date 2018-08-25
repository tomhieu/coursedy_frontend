import React, { Component, PropTypes } from 'react';
import { TRIGGER_DISPLAY_FIX_HEADER_BAR_OFFSET } from 'constants/WebConstants';

class FixedSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayFixedSidebar: false,
    };
    this.onScroll = this.checkScrollPosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  checkScrollPosition() {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (TRIGGER_DISPLAY_FIX_HEADER_BAR_OFFSET < currentPosition) {
      this.setState({
        displayFixedSidebar: true
      });
    } else {
      this.setState({
        displayFixedSidebar: false
      });
    }
  }

  render() {
    const onScrollTopMargin = this.props.onScrollTopMargin || 0;
    return (
      <div
        className={this.state.displayFixedSidebar
          ? 'left-sidebar no-pad d-md-block sidebar-fixed-scrolled'
          : 'left-sidebar no-pad d-md-block sidebar-fixed-normal'
        }
        style={{ marginTop: `${onScrollTopMargin}px` }}
      >
        {this.props.children}
      </div>
    );
  }
}

FixedSideBar.propTypes = {
  onScrollTopMargin: React.PropTypes.number
};


export default FixedSideBar;
