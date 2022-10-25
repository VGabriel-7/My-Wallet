// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SEND_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { email } = action;
  switch (action.type) {
  case SEND_EMAIL:
    return { ...state, email };
  default:
    return state;
  }
};

export default user;
