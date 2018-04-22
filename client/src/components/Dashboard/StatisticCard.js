import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StatisticCard extends Component {
  render() {
    const { value, title, isRedirect, redirectUrl, redirectText, subClasses } = this.props
    //FIXME: subClasses is special situation for this theme. Need to replace later
    return (
      <div className="col-md-4 pad10">
        <div className={'dash-block ' + subClasses}>
          <h2>
            { value } 
            {
              isRedirect 
                ? <Link className="pull-right" to={redirectUrl}>{redirectText}</Link>
                : null
            }
          </h2>
          <p>{ title }</p>
        </div>
      </div>
    )
  }
}

StatisticCard.propTypes = {
  value: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  isRequired: React.PropTypes.bool.isRequired,
}

export default StatisticCard