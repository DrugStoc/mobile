import { HAS_ONBOARDED, START_LOADING, STOP_LOADING, UI_START_LOADING, UI_STOP_LOADING, UPDATE_DOCUMENT } from '../../utils/action.types';

const initialState = {
	isloading: false,
	onboarded: false,
	uiloading: false,
	update_document: false
};

export const loadingReducer = (state = initialState, action) => {
	switch (action.type) {
		case START_LOADING:
			return {
				...state,
				isloading: true
			};
		case STOP_LOADING:
			return {
				...state,
				isloading: false
			};
		case HAS_ONBOARDED:
			return {
				...state,
				onboarded: true
			};
		case UI_START_LOADING:
			return {
				...state,
				uiloading: true
			};
		case UI_STOP_LOADING:
			return {
				...state,
				uiloading: false
			};
		case UPDATE_DOCUMENT:
			return {
				...state,
				update_document: true
			};
		default:
			return state;
	}
};
