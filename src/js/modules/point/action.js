export const actionTypes = {
  // FETCH_HISTORY: 'point/fetch',
  // FETCH_HISTORY_SUCCESS: 'point/fetch_history_success',
  // FETCH_HISTORY_FAILED: 'point/fetch_history_failed',
  FETCH_EXCHANGE: 'point/fetch_exchange',
  FETCH_EXCHANGE_SUCCESS: 'point/fetch_exchange_success',
  FETCH_EXCHANGE_FAILED: 'point/fetch_exchange_failed',
  EXCHANGE: 'point/exchange',
  EXCHANGE_SUCCESS: 'point/exchange_success',
  EXCHANGE_FAILED: 'point/exchange_failed',
  SEND: 'point/send',
  SEND_SUCCESS: 'point/send_success',
  SEND_FAILED: 'point/send_failed',
  CLOSE_DIALOG: 'point/closeDialog'
};

export const actions = {
  fetchExchange: () => ({
    type: actionTypes.FETCH_EXCHANGE,
  }),
  fetchExchangeSuccess: (items) => ({
    type: actionTypes.FETCH_EXCHANGE_SUCCESS,
    payload: {
      exchangeItems: items
    }
  }),
  exchange: (postData) => ({
    type: actionTypes.EXCHANGE,
    payload: { postData }
  }),
  exchangeSuccess: (exchangedObjectId) => ({
    type: actionTypes.EXCHANGE_SUCCESS,
    payload: { exchangedObjectId }
  }),
  closeDialog: () => ({
    type: actionTypes.CLOSE_DIALOG,
  }),
  send: (userId, point, pointType) => ({
    type: actionTypes.SEND,
    payload: {
      userId, point, pointType
    }
  })
};