import { DRAFT_ORDERS_DETAIL, EDIT_DRAFT_ORDERS_DETAIL, EDIT_ORDERS_DETAIL, MY_ORDERS_DETAIL, MY_ORDERS_RESULT, REMOVE_DRAFT_ORDERS_DETAIL, REMOVE_ORDERS_DETAIL } from "../../utils/action.types";

const initialState = {
	loading: true,
    order_details: [],
	draft_order: [],
	data: []
};

const edit = (arr, payload) => {
	let newArr = [...arr]
	newArr[payload.id].quantity =  payload.quantity 
	return newArr
}

function arrayRemove(arr, value) {
	return arr.filter(function(ele) {
		return ele.id != value.id;
	});
}

export const myOrderReducer = (state = initialState, action) => {
	switch (action.type) {
		case MY_ORDERS_RESULT:
			return {
				...state,
				loading: false,
				data: action.payload.results
			};
        case MY_ORDERS_DETAIL:
            return {
                ...state, order_details: action.payload.results
            }
		case EDIT_ORDERS_DETAIL:
			return {
				...state, order_details: edit(state.order_details, action.payload)
			}
		case REMOVE_ORDERS_DETAIL:
			return {
				...state, order_details: arrayRemove(state.order_details, action.payload)
			}
		case DRAFT_ORDERS_DETAIL:
			return {
				...state, draft_order: action.payload
			}
		case EDIT_DRAFT_ORDERS_DETAIL:
			return {
				...state, draft_order: edit(state.draft_order, action.payload)
			}
		case REMOVE_DRAFT_ORDERS_DETAIL:
			return {
				...state, draft_order: arrayRemove(state.draft_order, action.payload)
			}
		default:
			return state;
	}
};