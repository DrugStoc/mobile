import { CREDIT_FETCHED, STATEMENT_FETCHED, USER_ACCOUNT } from "../../utils/action.types";

  export const get_user = (payload) => {
    return {
      type: USER_ACCOUNT,
      payload
    };
  };

  export const get_statement = (payload) => {
    return {
      type: STATEMENT_FETCHED,
      payload
    }
  }

  export const get_credit = (payload) => {
    return {
      type: CREDIT_FETCHED,
      payload
    }
  }