// Coloque aqui suas actions
export const SEND_EMAIL = 'SEND_EMAIL';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const CURRENCIES_ERROR = 'CURRENCIES_ERROR';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDIT_EXPENSE = 'SAVE_EDIT_EXPENSE';

export const emailAction = (email) => ({ type: SEND_EMAIL, email });

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

const currenciesError = () => ({ type: CURRENCIES_ERROR });

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    dispatch(receiveCurrencies(Object.keys(currencies).filter((currencie) => (
      currencie !== 'USDT'))));
  } catch (err) {
    dispatch(currenciesError());
  }
};

export const addExpenses = (expense) => ({ type: ADD_EXPENSE, expense });

export const deleteExpenses = (idExpense) => ({ type: DELETE_EXPENSE,
  idExpense });

export const editExpenses = (idToEdit) => ({ type: EDIT_EXPENSE, idToEdit });

export const addEditedExpenses = (editedExpenses) => ({
  type: SAVE_EDIT_EXPENSE, editedExpenses });
