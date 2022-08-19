import {MANUFACTURER, MORE_MANUFACTURER, LOAD_MORE_MANUFACTURER, DESTROY_LEAKS_MANUFACTURER} from '../../utils/action.types'

const initialState = {
    page: null,
    loading: true,
    data: [],
    loading_more: false
}

export const manufacturerReducer = (state = initialState, action) => {
    switch(action.type) {
        case MANUFACTURER:
            return {
                ...state, loading: false, data: action.payload.results,  page: action.payload.next
            }
        case LOAD_MORE_MANUFACTURER: 
            return {
                ...state, loading_more: true
            }
        case MORE_MANUFACTURER:
            return {
                ...state, data: [...state.data, ...action.payload.results], loading_more: false, page: action.payload.next
            }
        case DESTROY_LEAKS_MANUFACTURER: 
            return {
                ...state, loading: false, loading_more: false, data: state.data.splice(0, 50), page: action.payload.next
            }
        default:
            return state;
    }
}