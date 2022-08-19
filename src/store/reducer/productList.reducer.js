import { LIST_PRODUCTS, DESTROY_LEAKS } from '../../utils/action.types';

const initialState = {
	loading: true,
	data: []
};

export const productListReducer = (state = initialState, action) => {
	switch (action.type) {
		case LIST_PRODUCTS:
			return {
				...state,
				loading: false,
				data: action.payload.results
			};
		case DESTROY_LEAKS:
			return {
				loading: true,
				data: []
			}
		default:
			return state;
	}
};
