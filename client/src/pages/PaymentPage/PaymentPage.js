import {StripeProvider} from "react-stripe-elements";
import {TT} from "utils/locale";
import * as React from "react";
import PaymentContainer from "../../containers/Payment/PaymentContainer";

const PaymentPage = (props) => {
  return (
    <div className="payment full-width-in-container">
        <div className="">
          <h2>Thanh toán</h2>
          <div className="divider"></div>
          <PaymentContainer />
        </div>
    </div>

  );
};

export default PaymentPage;
