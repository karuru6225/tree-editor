export const actionTypes = {
  CAECCO_START: 'caecco/start',
  COUNT_UP: 'caecco/count_up',
  CAECCO_STOP: 'caecco/stop',
  CAECCO_SUCCESS: 'caecco/successed',
  RESET: 'caecco/reset',
  SCAN_RECEIPT: 'caecco/scanReceipt',
  SCAN_FAILED: 'caecco/scanFailed',
  SEND_RECEIPT: 'caecco/sendReceipt',
  COMPLETE_SEND_RECEIPT: 'caecco/comlpeteSendReceipt'
};

export const actions = {
  caeccoStart: () => ({
    type: actionTypes.CAECCO_START,
  }),
  caeccoStop: (postData, point) => ({
    type: actionTypes.CAECCO_STOP,
    payload: {
      postData,
      point
    }
  }),
  sendSuccess: (caeccoHistoryId) => ({
    type: actionTypes.CAECCO_SUCCESS,
    payload: { caeccoHistoryId }
  }),
  countUp: () => ({
    type: actionTypes.COUNT_UP
  }),
  scanReceipt: () => ({
    type: actionTypes.SCAN_RECEIPT
  }),
  scanFailed: () => ({
    type: actionTypes.SCAN_FAILED
  }),
  reset: () => ({
    type: actionTypes.RESET
  }),
  sendReceipt: (img) => ({
    type: actionTypes.SEND_RECEIPT,
    payload: { img }
  }),
  completeSendReceipt: () => ({
    type: actionTypes.COMPLETE_SEND_RECEIPT
  })
};
