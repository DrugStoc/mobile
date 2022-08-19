import { concat } from 'react-native-reanimated';
import { ADD_ITEM_TO_CART, EDIT_ITEM_TO_CART, REMOVE_ITEM_TO_CART, EMPTY_CART, REFRESH_CART } from '../../utils/action.types';

const initialState = {
	loading: true,
	data: []
};

function arrayRemove(arr, value) {
	return arr.filter(function(ele) {
		return ele.ids != value.ids;
	});
}

function unique(array, payload) {
	return array.concat(payload);
}

const edit = (arr, payload) => {
	console.log(payload)
	let newArr = [...arr]
	console.log(newArr[payload.id], payload.quantity )
	newArr[payload.id].quantity =  payload.quantity 
	return newArr
}

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ITEM_TO_CART:
			return {
				...state,
				loading: false,
				data: unique(state.data, action.payload)
			};
		case REMOVE_ITEM_TO_CART:
			return {
				...state,
				loading: false,
				data: arrayRemove(state.data, action.payload)
			};
		case EDIT_ITEM_TO_CART:
			return {
				...state,
				loading: false,
				data: edit(state.data, action.payload)
			};
		case REFRESH_CART:
			return {
				...state,
				loading: false,
				data: action.payload
			};
		case EMPTY_CART:
			return {
				...state,
				loading: false,
				data: []
			}
		default:
			return state;
	}
};
