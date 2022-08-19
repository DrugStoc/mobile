import { SIGN_IN, SIGN_OUT, UPDATE_DOCUMENT, VERIFY_ACCOUNT, RESEND_OTP, ADD_ADDRESS, SET_DEFAULT_ADDRESS } from "../../utils/action.types";

export const sign_in = () => {
    return {
      type: SIGN_IN
    };
  };
  
  export const sign_out = () => {
    return {
      type: SIGN_OUT,
    };
  };

  export const verify_account = (payload) => {
      return {
          type: VERIFY_ACCOUNT,
          payload,
      }
  }

  export const resend_otp = (payload) => {
    return {
      type: RESEND_OTP,
      payload
    }
  }

  export const skip_for_now = () => {
    return {
      type: UPDATE_DOCUMENT
    }
  }


  export const add_address = (payload) => {
    return {
      type: ADD_ADDRESS,
      payload
    }
  }

  export const setDefaultAddress = (payload) => {
    return {
      type: SET_DEFAULT_ADDRESS,
      payload
    }
  }