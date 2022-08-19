import { USER_ACCOUNT, SET_PIN } from "../../utils/action.types";

const intialState = {
    user: {},
    pin: '0000',
  };
  
  export const userReducer = (state = intialState, action) => {
    switch (action.type) {
      case USER_ACCOUNT:
        return {
            ...state,
          user: action.payload,
        };
      case SET_PIN:
        return {
          ...state, pin: action.payload,
        }
      default:
        return state;
    }
  };