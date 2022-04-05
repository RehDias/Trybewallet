// Coloque aqui suas actions
import getCurrency from '../services/currencyAPI';

export const GET_EMAIL = 'EMAIL';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_CURRENCY_SUCCESS = 'REQUEST_CURRENCY_SUCCESS';
export const GET_EXPENSES = 'GET_EXPENSES';
// export const GET_EXCHANGE_RATE = 'GET_EXCHANGE_RATE';

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
  delete apiResult.USDT; // https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object;
  const currencies = Object.keys(apiResult);
  dispatch(requestCurrencySuccess(currencies));
};

export const actionFectchCurrency = () => fetchCurrency;

export const actionExpenses = (state) => ({ type: GET_EXPENSES, state });

// const getExchangeRate = (payload) => ({ type: GET_EXCHANGE_RATE, payload });

// const fetchExchangeRates = async (dispatch) => {
//   const apiResult = await getCurrency();
//   delete apiResult.USDT; // https://stackoverflow.com/questions/3455405/how-do-i-remove-a-key-from-a-javascript-object;
//   dispatch(actionExpenses(obj));
// };

// export const actionExchangeRate = () => fetchExchangeRates;
