import React from 'react';
import {CardElement} from 'react-stripe-elements';

export class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <CardElement style={{base: {fontSize: '18px'}}} />
      </label>
    );
  }
}