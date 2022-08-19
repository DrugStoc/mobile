import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { add_address, setDefaultAddress } from '../store/action/auth.action';
import {
	add_cart_item,
	all_products,
	destroy_more_brand,
	distroy_leaks_all,
	draft_list_detail,
	edit_cart,
	edit_list_user,
	empty_cart,
	load_more_brand,
	load_more_brand_ui,
	more_products,
	orders_list_detail,
	orders_list_user,
	product_brand,
	product_categories,
	product_list_all,
	refresh_cart,
	remove_cart_item,
	remove_list_order
} from '../store/action/categories.action';
import { ui_start_loading, ui_stop_loading } from '../store/action/loading.action';
import { loading_search, search_result } from '../store/action/search.action';
import { get_statement } from '../store/action/user.action';
import { urlendPoint } from '../utils/api';

export const get_recommended_products = () => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		const d = new Date();
		let page = d.getHours();
		axios
			.get(`${urlendPoint}/api/products/products?page=${page}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp.data)
				dispatch(all_products(resp.data));
			})
			.catch((err) => {
				console.error(err.response);
			});
	};
};

export const get_more_products = (url) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		axios
			.get(`${url}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp.data);
				dispatch(more_products(resp.data));
			})
			.catch((err) => {
				console.error(err.response);
			});
	};
};

export const get_products_categories = () => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/category`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				dispatch(product_categories(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const get_product_each_category = (id) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/category/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				dispatch(product_list_all(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const search_products = (data) => {
	return async (dispatch) => {
		dispatch(loading_search());
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/search?products=${data}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				dispatch(search_result(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const get_manufacturer = (query) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/manufacturer${query?`?search=${query}&ordering=priority`: '?ordering=priority'}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp)
				dispatch(product_brand(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const load_more_manufacturer = (page) => {
	return async (dispatch) => {
		dispatch(load_more_brand_ui())
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${page}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				dispatch(load_more_brand(resp.data))
			})
			.catch((err) => {
				console.log(err.response);
			});
	}
}

export const destroy_manufacturer_leaks = () =>  {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/manufacturer`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				dispatch(destroy_more_brand(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	}
}

export const get_product_for_each_manufacturer = (payload) => {
	return async (dispatch) => {
		dispatch(loading_search())
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/manufacturer/${payload}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp);
				dispatch(product_list_all(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const destroy = () => {
	return async (dispatch) => {
		dispatch(distroy_leaks_all())
	}
}

export const get_user_order = () => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/orders`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp);
				dispatch(orders_list_user(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const get_user_order_item = (payload) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/orders/${payload}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp);
				dispatch(orders_list_detail(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const get_user_cart_item = () => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/cart/`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				// console.log(resp.data);
				let cart_item = resp.data.results.map((item, i) => ({
					id: item.id,
					name: item.name,
					image: item.image,
					ids: item.ids,
					quantity: item.quantity, 
					inStore: item.available_quantity,
					price: item.price,
				}))
				// console.log(cart_item)
				dispatch(refresh_cart(cart_item));
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const add_item_to_cart = (payload) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		dispatch(add_cart_item(payload));
		await axios
			.post(`${urlendPoint}/api/cart/`, payload, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp);
				dispatch(get_user_cart_item());
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const remove_item_from_cart = (payload) => {
	return async (dispatch) => {
		console.log(payload);
		let logged_in_user = await AsyncStorage.getItem('token');
		dispatch(remove_cart_item(payload));
		await axios
			.delete(`${urlendPoint}/api/cart/${payload.id}/remove`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				// console.log(resp);
			})
			.catch((err) => {
				console.log(err.response);
			});
	};
};

export const edit_previous_orders = (payload) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		dispatch(edit_list_user(payload));
	};
};

export const edit_cart_items = (payload) => {
	return async (dispatch) => {
		payload.data.quantity = payload.quantity
		console.log(payload.data)
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.put(`${urlendPoint}/api/cart/${payload.data.id}`, payload.data, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp);
				dispatch(get_user_cart_item());
			})
			.catch((err) => {
				console.log(err.response);
			});
		dispatch(edit_cart(payload));
	};
};

export const delete_item_from_previous_orders = (payload) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		dispatch(remove_list_order(payload));
	};
};

export const make_draft_from_previous_orders = (payload) => {
	return async (dispatch) => {
		let logged_in_user = await AsyncStorage.getItem('token');
		dispatch(draft_list_detail(payload));
	};
};

export const create_order = (payload) => {
	return async dispatch => {
		dispatch(ui_start_loading())
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.post(`${urlendPoint}/api/products/create-order`, { items : payload}, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			})
			.then((resp) => {
				console.log(resp);
				dispatch(ui_stop_loading())
				dispatch(empty_cart())
				dispatch(get_user_order())
				// dispatch(orders_list_detail(resp.data));
			})
			.catch((err) => {
				console.log(err.response);
				dispatch(ui_stop_loading())
				dispatch(empty_cart())
			});
	};
}

export const customer_statement = () => {
	return async dispatch => {
		dispatch(ui_start_loading())
		let logged_in_user = await AsyncStorage.getItem('token');
		await axios
			.get(`${urlendPoint}/api/products/user_statement`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Token ${logged_in_user}`
				}
			}).then(resp => {
				console.log(resp)
				dispatch(get_statement(resp.data))
				dispatch(ui_stop_loading())
			}).catch(err => {
				console.warn(err.response)
				dispatch(ui_stop_loading())
			})
	};
}

export const addToAddressBook = (data) => {
	return dispatch => {
		dispatch(add_address(data))
	}
}

export const setdefaultAddress = (data) => {
	return dispatch => {
		console.log(data)
		dispatch(setDefaultAddress(data))
	}
}
