import { StripeProvider } from 'react-stripe-elements';
import { TT } from 'utils/locale';
import * as React from 'react';
import PaymentContainer from '../../containers/Payment/PaymentContainer';
import PageContainer from '../../utils/PageContainer';


class PaymentPage extends React.Component {
  render() {
    const { course, totalAmount, currency } = this.props;
    return (
      <PageContainer
        meta={{ title: this.context.t('payment_page')}}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-sm-5">
              <div className="row">
                <div className="col-md-12 col-sm-12">
                  <span>{TT.t('total_payment')}</span>
                  <div className="d-flex flex-horizontal">
                    <span>{currency}</span>
                    <span>{totalAmount}</span>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12">
                  <span>{TT.t('payment_methods')}</span>
                  <div className="d-flex flex-horizontal">
                    <span>{currency}</span>
                    <span>{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-sm-7">
              <StripeProvider apiKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh">
                <PaymentContainer courseId={this.props.match.params.id} />
              </StripeProvider>
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }
}


PaymentPage.contextTypes = {
  t: React.PropTypes.func.isRequired
}
export default PaymentPage;
