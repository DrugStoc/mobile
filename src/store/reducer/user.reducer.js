import {SET_PIN, USER_ACCOUNT} from '../../utils/action.types';

const intialState = {
  user: {},
  pin: '0000',
};

export const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case USER_ACCOUNT:
      // console.log('USER_ACCOUNT');
      // console.log(state);
      // console.log('payload', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    case SET_PIN:
      return {
        ...state,
        pin: action.payload,
      };
    default:
      return state;
  }
};
