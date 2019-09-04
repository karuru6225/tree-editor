import { handleActions } from 'redux-actions';
import { actionTypes } from './action';
import ExchangeItemDto from 'common/dto/ExchangeItem';

const defaultState = {
    exchangeItems: [new ExchangeItemDto().getObject()],
    isPointDialogOpen: false,
    exchangedObjectId: '',
};

export default handleActions({
    [actionTypes.FETCH_EXCHANGE_SUCCESS]: (prevState, action) => {
        return {
            ...prevState,
            exchangeItems: action.payload.exchangeItems,
        };
    },
    [actionTypes.EXCHANGE_SUCCESS]: (prevState, action) => {
        return {
            ...prevState,
            exchangedObjectId: action.payload.exchangedObjectId,
            isPointDialogOpen: true
        }
    },
    [actionTypes.CLOSE_DIALOG]: (prevState) => {
        return {
            ...prevState,
            isPointDialogOpen: false
        }
    },
}, defaultState);