// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECEIVE_CURRENCIES, CURRENCIES_ERROR,
  ADD_EXPENSE, DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  error: '',
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const { currencies, expense, idExpense, idToEdit, editedExpenses } = action;
  switch (action.type) {
  case RECEIVE_CURRENCIES:
    return { ...state, currencies };
  case CURRENCIES_ERROR:
    return { ...state, error: 'Error:' };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, expense] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter(({ id }) => id !== idExpense) };
  case EDIT_EXPENSE:
    return { ...state, idToEdit, editor: true };
  case SAVE_EDIT_EXPENSE:
    return { ...state,
      expenses: [...editedExpenses],
      editor: false };
  default:
    return state;
  }
};

export default wallet;
