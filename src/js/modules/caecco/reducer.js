import { handleActions } from 'redux-actions';
import { actionTypes } from './action';

const defaultState = {
  isStart: false,
  count: 0,
  startDateTime: Date.now(),
  caeccoHistoryId: '',
  receiptSentDialogIsOpen: false
}

export default handleActions({
  [actionTypes.CAECCO_START]: prevState => ({
    ...prevState,
    isStart: true,
    startDateTime: Date.now(),
    isReceiptSent: false
  }),
  [actionTypes.CAECCO_STOP]: prevState => ({
    ...prevState,
    isStart: false
  }),
  [actionTypes.COUNT_UP]: prevState => ({
    ...prevState,
    count: Math.floor((Date.now() - prevState.startDateTime)/1000),
  }),
  [actionTypes.CAECCO_SUCCESS]: (prevState, action) => ({
    ...prevState,
    caeccoHistoryId: action.payload.caeccoHistoryId,
  }),
  [actionTypes.SCAN_FAILED]: () => defaultState,
  [actionTypes.RESET]: () => defaultState,
  [actionTypes.COMPLETE_SEND_RECEIPT]: prevState => ({
    ...prevState,
    receiptSentDialogIsOpen: true
  })
}, defaultState);
