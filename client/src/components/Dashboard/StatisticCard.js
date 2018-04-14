import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class StatisticCard extends Component {
  render() {
    const { value, title, isRedirect, redirectUrl, redirectText, subClasses } = this.props
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

export default StatisticCard