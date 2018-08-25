import Network from 'utils/network';
import {
  FETCH_USER_BALANCE,
  FETCH_PAYMENT_HISTORY
} from './AsyncActionCreator';

export const FETCH_SUPPORTED_BANK_LIST_COMPLETE = 'FETCH_SUPPORTED_BANK_LIST_COMPLETE';
const domesticBankList = [
  {
    id: 1,
    name: 'ACB',
    bankAccount: {
      bankName: 'Pham Duy Bao Trung',
      bankNumber: '9124 6788 6778 900',
      transaction: 'Ly Thuong Kiet'
    }
  }
];

export const loadDomesticBankList = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUPPORTED_BANK_LIST_COMPLETE,
      data: domesticBankList
    });
  };
};


export const fetchUserBalance = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_USER_BALANCE,
      payload: Network().get('users/balance')
    });
  };
};

export const fetchPaymentHistory = () => {
  return (dispatch) => {
    // dispatch({
    //   type: FETCH_PAYMENT_HISTORY,
    //   payload: Network().get('/users/payment_history')
    // })


    dispatch({
      type: 'FETCH_PAYMENT_HISTORY_FULFILLED',
      payload: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].reduce((result, item) => {
        return [...result, {
          id: item,
          order_id: '1234567',
          user_id: 1,
          content: 'Nạp tiền vào tài khoản Ezylearning',
          value: 500000,
          method: 'Thẻ tín dụng',
          created_at: '20/03/2018',
          status: 'Hoàn thành',
        }];
      }, [])
    });
  };
};
