import { MORE_PRODUCTS, PRODUCTS } from "../../utils/action.types";

const initialState = {
    loading: true,
    next: null,
    data: []
}


export const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCTS:
            return {
                ...state, loading: false, data: action.payload.results, next: action.payload.next
            }
        case MORE_PRODUCTS:
            return {
                ...state, loading: false, data: [...state.data.concat(action.payload.results)], next: action.payload.next
            }
        default:
            return state;
    }
}