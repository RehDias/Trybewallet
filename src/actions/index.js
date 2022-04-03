// Coloque aqui suas actions
import getCurrency from '../services/currencyAPI';

export const GET_EMAIL = 'EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCCESS = 'REQUEST_CURRENCY_SUCCESS';

export const actionEmail = (payload) => ({ type: GET_EMAIL, payload });

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const requestCurrencySuccess = (currencies) => ({
  type: REQUEST_CURRENCY_SUCCESS,
  currencies,
});

const fetchCurrency = async (dispatch) => {
  dispatch(requestCurrency());
  const apiResult = await getCurrency();
  const currencies = Object.keys(apiResult).filter((currency) => currency !== 'USDT');
  dispatch(requestCurrencySuccess(currencies));
};

export const actionFectchCurrency = () => fetchCurrency;
