import { RESEND_OTP, RESTORE_TOKEN, SIGN_IN, SIGN_OUT, VERIFY_ACCOUNT } from "../../utils/action.types";


const intialState = {
  is_signout: true,
  verify: false,
  verify_data: {},
  phone_no: ''
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case RESTORE_TOKEN:
      return {
          ...state,
        is_signout: false,
      };
    case SIGN_IN:
      return {
          ...state,
        is_signout: false,
      };
    case SIGN_OUT:
      return {
          ...state,
        is_signout: true,
      };
    case VERIFY_ACCOUNT:
      return {
          ...state, verify: true, verify_data: action.payload
      }
    case RESEND_OTP:
      return {
        ...state, phone_no: action.payload.new_phone
      }
    default:
      return state;
  }
};