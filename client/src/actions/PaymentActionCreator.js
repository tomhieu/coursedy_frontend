export const FETCH_SUPPORTED_BANK_LIST_COMPLETE = "FETCH_SUPPORTED_BANK_LIST_COMPLETE"

export const loadDomesticBankList = () => {
  return dispatch => {
    dispatch({
      type: FETCH_SUPPORTED_BANK_LIST_COMPLETE,
      data: domesticBankList
    });
  }
}

export const fetchPaymentHistory = () => {
  return dispatch => {
    // dispatch({
    //   type: FETCH_PAYMENT_HISTORY,
    //   payload: Network().get('/users/payment_history')
    // })
    

    dispatch({
      type: 'FETCH_PAYMENT_HISTORY_FULFILLED',
      payload: [1,2,3,4,5,6,7,8,9,10,11].reduce((result, item) => {
        return [...result, {
          id: item,
          order_id: '1234567',
          user_id: 1,
          content: 'Nạp tiền vào tài khoản Ezylearning',
          value: 500000,
          method: 'Thẻ tín dụng',
          created_at: '20/03/2018',
          status: 'Hoàn thành',
        }]
      }, [])
    })
  }
}