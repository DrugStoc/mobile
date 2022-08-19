import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { addressReducer } from './reducer/address.reducer';
import { authReducer } from './reducer/auth.reducer';
import { cartReducer } from './reducer/cart.reducer';
import { categoriesReducer } from './reducer/categories.reducer';
import { loadingReducer } from './reducer/loading.reducer';
import { manufacturerReducer } from './reducer/manufacturer.reducer';
import { myOrderReducer } from './reducer/orders.reducer';
import { productListReducer } from './reducer/productList.reducer';
import { productReducer } from './reducer/products.reducer';
import { search_reducer } from './reducer/search.reducer';
import { statement_reducer } from './reducer/statement.reducer';
import { userReducer } from './reducer/user.reducer';


const rootReducer = combineReducers({
    loading: loadingReducer,
    authentication: authReducer,
    user: userReducer,
    categories: categoriesReducer,
    products: productReducer,
    search: search_reducer,
    brand: manufacturerReducer,
    product_list: productListReducer,
    order: myOrderReducer,
    cart: cartReducer,
    statement: statement_reducer,
    address: addressReducer
})


let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;