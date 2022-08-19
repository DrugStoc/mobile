import { LOADING_SEARCH, SEARCH_RESULT } from "../../utils/action.types"

const initialState = {
    loading: false,
    all: [],
    name: [],
    brand: [],
    composition: [],
    next: "",
    previous: ''
}

export const search_reducer = (state = initialState, action) => {
    switch(action.type) {
        case LOADING_SEARCH:
            return {
                ...state, loading: true
            }
        case SEARCH_RESULT:
            return {
                ...state,
                loading: false,
                all: action.payload.results.all,
                name: action.payload.results.product_name,
                brand: action.payload.results.product_brand,
                composition: action.payload.results.product_composition
            }
        default:
            return state;
    }

}