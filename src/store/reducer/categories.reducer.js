import { CATEGORIES } from "../../utils/action.types";

const initialState = {
    loading: true,
    data: []
}

export const categoriesReducer = (state = initialState, action) => {
    switch(action.type) {
        case CATEGORIES:
            return {
                ...state, loading: false, data: action.payload.results
            }
        default:
            return state;
    }
}