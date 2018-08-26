import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class CourseGroupHeading extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  static defaultProps = {
    title: ''
  }

  render() {
    return (
      <h2 className="heading">{this.props.title}</h2>
    );
  }
}
