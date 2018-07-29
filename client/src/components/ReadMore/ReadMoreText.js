import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trimText from 'utils/trimText';
import './ReadMoreText.scss'

export default class ReadMoreText extends Component {
  constructor(props){
    super(props);
    this.state = { displaySecondary: false, primaryText: "", secondaryText: "" };
  }

  componentDidMount() {
    let args = [
      this.props.text,
      this.props.min,
      this.props.ideal,
      this.props.max
    ];

    let textBreakdown = trimText(...args);
    this.setState({primaryText: textBreakdown[0], secondaryText: textBreakdown[1]});
  }

  setStatus() {
    let display = !this.state.displaySecondary;
    this.setState({displaySecondary: display});
  }

  render() {
    let displayText;
    const { className } = this.props
    if (!this.state.secondaryText) {
      displayText = (
        <div className="display-text-group">
				<span className={`displayed-text ${className ? className : ''}`}>
					{`${this.state.primaryText} ${this.state.secondaryText}`}
				</span>
        </div>);
    }
    else if (this.state.displaySecondary) {
      displayText = (
        <div className="display-text-group">
				<span className={`displayed-text ${className ? className : ''}`}
              onClick={this.setStatus.bind(this)}>
					{`${this.state.primaryText} ${this.state.secondaryText}`}
				</span>
        </div>);
    } else {
      displayText = (<div className="display-text-group">
				<span className={`displayed-text ${className ? className : ''}`}
              onClick={this.setStatus.bind(this)}>
						{`${this.state.primaryText}`}
          <div className="read-more-button">{this.props.readMoreText}</div>
				</span>
      </div>);
    }

    return displayText;
  }
}

ReadMoreText.defaultProps = {
  readMoreText: 'Read more +'
}

ReadMoreText.propTypes = {
  text: PropTypes.string.isRequired,
  min: PropTypes.number,
  ideal: PropTypes.number,
  max: PropTypes.number,
  readMoreText: PropTypes.string
};
