import { CREDIT_FETCHED, STATEMENT_FETCHED } from "../../utils/action.types"

const initialState = {
    statement: [],
    next: null,
    credit: 0,
    total_invoiced: 0 
}

export const statement_reducer = (state = initialState, action) => {
    switch(action.type) {
        case STATEMENT_FETCHED:
            return {
                ...state,
                statement: action.payload.results,
                next: action.payload.next
            }
        case CREDIT_FETCHED:
            return {
                ...state,
                credit: action.payload.data.credit,
                total_invoiced: action.payload.data.total_invoiced_credit
            }
        default:
            return state;
    }

}