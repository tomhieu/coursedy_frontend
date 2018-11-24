import { FETCH_SUPPORTED_BANK_LIST_COMPLETE } from 'actions/PaymentActionCreator';
import { TT } from 'utils/locale';
import * as asyncActs from '../actions/AsyncActionCreator';

let errorMessages;
const Payment = (state = {
  supportedBankList: [],
  paymentHistory: [],
  paymentHistoryPagination: {
    currentPage: 1,
    totalResult: 0,
  },
  bankTransferToken: '',
  isFetchingPaymentHistory: true,
  errors: []
}, action) => {
  switch (action.type) {
    case FETCH_SUPPORTED_BANK_LIST_COMPLETE:
      return Object.assign({}, state, { supportedBankList: action.data });

    case asyncActs.FETCH_PAYMENT_HISTORY + asyncActs.PENDING:
      return {
        ...state,
        isFetchingPaymentHistory: true,
        paymentHistory: []
      };
    case asyncActs.FETCH_PAYMENT_HISTORY + asyncActs.FULFILLED:
      return {
        ...state,
        isFetchingPaymentHistory: false,
        paymentHistory: action.payload
      };
    case asyncActs.FETCH_PAYMENT_HISTORY + asyncActs.REJECTED:
      errorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0)
        ? errors : [TT.t('fetch_payment_history_fail')];
      return { ...state, paymentHistory: [], errors: errorMessages };
    /*=======================================*/
    case asyncActs.FETCH_BANK_TRANSFER_TOKEN + asyncActs.PENDING:
      return { ...state };
    case asyncActs.FETCH_BANK_TRANSFER_TOKEN + asyncActs.FULFILLED:
      return {
        ...state,
        bankTransferToken: action.payload.token
      };
    case asyncActs.FETCH_BANK_TRANSFER_TOKEN + asyncActs.REJECTED:
      errorMessages = (action.payload && Array.isArray(action.payload) && action.payload.length > 0)
        ? errors : [TT.t('fetch_payment_history_fail')];
      return { ...state, paymentHistory: [], errors: errorMessages };
    default:
      return state;
  }
};

export default Payment;
