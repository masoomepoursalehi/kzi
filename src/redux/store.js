import { legacy_createStore as createStore , combineReducers, applyMiddleware} from "redux";
import {
    profile,
    cart
} from "./reducer";
import thunk from "redux-thunk";
const reducer = combineReducers({
    profile,
    cart
});
const middleWare=[thunk];
const updateProduct =JSON.parse(localStorage.getItem("shoppingCart")) || [];
const initialState = { cart: { shoppingCart: updateProduct }};
const store = createStore(reducer,initialState,applyMiddleware (...middleWare));

export default store;