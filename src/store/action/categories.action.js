import {
	CATEGORIES,
	PRODUCTS,
	MANUFACTURER,
	LOAD_MORE_MANUFACTURER,
	MORE_MANUFACTURER,
	DESTROY_LEAKS_MANUFACTURER,
	LIST_PRODUCTS,
	MY_ORDERS_RESULT,
	MY_ORDERS_DETAIL,
	ADD_ITEM_TO_CART,
	REMOVE_ITEM_TO_CART,
	EDIT_ORDERS_DETAIL,
	REMOVE_ORDERS_DETAIL,
    DRAFT_ORDERS_DETAIL,
	MORE_PRODUCTS,
	DESTROY_LEAKS,
	EDIT_ITEM_TO_CART,
	EMPTY_CART,
	REFRESH_CART
} from '../../utils/action.types';

export const product_categories = (payload) => {
	return {
		type: CATEGORIES,
		payload
	};
};


export const all_products = (payload) => {
	return {
		type: PRODUCTS,
		payload
	};
};

export const more_products = (payload) => {
	return {
		type: MORE_PRODUCTS,
		payload
	};
};

// list all aminfacturer available 
export const product_brand = (payload) => {
	return {
		type: MANUFACTURER,
		payload
	};
};

// load more manufacturers ui
export const load_more_brand_ui = () => {
	return {
		type: LOAD_MORE_MANUFACTURER
	}
}

// load more manufacturers 
export const load_more_brand = (payload) => {
	return {
		type: MORE_MANUFACTURER,
		payload
	}
}

// destroy leak 
export const destroy_more_brand = (payload) => {
	return {
		type: DESTROY_LEAKS_MANUFACTURER,
		payload
	}
}

// list all products available to users
export const product_list_all = (payload) => {
	return {
		type: LIST_PRODUCTS,
		payload
	};
};

// list all products available to users
export const distroy_leaks_all = () => {
	return {
		type: DESTROY_LEAKS,
	};
};

// list exiting orders made by the user
export const orders_list_user = (payload) => {
	return {
		type: MY_ORDERS_RESULT,
		payload
	};
};

// edit detail list from a list of orders
export const edit_list_user = (payload) => {
	return {
		type: EDIT_ORDERS_DETAIL,
		payload
	};
};

// edit detail list from a list of orders
export const edit_cart = (payload) => {
	return {
		type: EDIT_ITEM_TO_CART,
		payload
	};
};

// remove order details from the list
export const remove_list_order = (payload) => {
	return {
		type: REMOVE_ORDERS_DETAIL,
		payload
	};
};

// view all details of a particular order
export const orders_list_detail = (payload) => {
	return {
		type: MY_ORDERS_DETAIL,
		payload
	};
};

// add item to draft list
export const draft_list_detail = (payload) => {
	return {
		type: DRAFT_ORDERS_DETAIL,
		payload
	};
};

// add item to cart
export const add_cart_item = (payload) => {
	return {
		type: ADD_ITEM_TO_CART,
		payload
	};
};

// remove item from a cart
export const remove_cart_item = (payload) => {
	return {
		type: REMOVE_ITEM_TO_CART,
		payload
	};
};

export const empty_cart = () => {
	return {
		type: EMPTY_CART
	}
}

// refresh cart
export const refresh_cart = (payload) => {
	return {
		type: REFRESH_CART,
		payload
	}
}
