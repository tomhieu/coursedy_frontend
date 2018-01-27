import * as React from "react";
import {Component} from "react";
import './Checkout.module.scss'
import {CardElement, injectStripe} from "react-stripe-elements";

class _CheckoutForm extends Component {

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  handleBlur = () => {
    console.log('[blur]');
  };
  handleChange = change => {
    console.log('[change]', change);
  };
  handleClick = () => {
    console.log('[click]');
  };
  handleFocus = () => {
    console.log('[focus]');
  };
  handleReady = () => {
    console.log('[ready]');
  };

  createOptions = (fontSize) => {
    return {
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, Menlo, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    };
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement
            onBlur={this.handleBlur.bind(this)}
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onReady={this.handleReady.bind(this)}
            {...this.createOptions(this.props.fontSize)}
          />
        </label>
        <button>Pay</button>
      </form>
    )
  }
}

const CheckoutForm = injectStripe(_CheckoutForm);
export default CheckoutForm;