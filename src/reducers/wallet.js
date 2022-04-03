// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCY, REQUEST_CURRENCY_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCY:
    return { ...state, isFetching: true };
  case REQUEST_CURRENCY_SUCCESS:
    return { ...state, currencies: action.currencies, isFetching: false };
  default:
    return state;
  }
};

export default wallet;
