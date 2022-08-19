import { LOADING_SEARCH, SEARCH_RESULT } from "../../utils/action.types"


export const loading_search = () => {
    return {
        type: LOADING_SEARCH
    }
}

export const search_result = (payload) => {
    return {
        type: SEARCH_RESULT,
        payload
    }
}