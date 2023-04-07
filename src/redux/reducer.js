/*======================
   CART
=======================*/
import { toast } from 'react-toastify';
export const cart = (state = { shoppingCart: [] }, { type, payload }) => {
    switch (type) {
        case 'successAddToCart':
            const exist = state.shoppingCart.find(
                (item) => item._id === payload._id
            );
            if (exist) {
                toast('The product you selected is available in your shopping cart. Please refer to the shopping cart to add the quantity.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "warning"
                })
                return ({ ...state });
            }
            else {
                toast(`${payload.name} added to your cart.`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    type: "success"
                })
                return ({
                    ...state,
                    shoppingCart: [...state.shoppingCart, payload]
                })
            }
        case 'failedAddToCart':
            return payload.error;

        case 'plusProduct':
            const plus = state.shoppingCart.map((item) =>
                item._id === payload._id && item.countInStock > item.qty ? { ...item, qty: item.qty + 1 } : item
            )
            return {
                ...state,
                shoppingCart: plus
            };

        case 'minusProduct':
            const minus = state.shoppingCart.map((item) =>
                item._id === payload._id && 1 < item.qty ? { ...item, qty: item.qty - 1 } : item
            )
            return {
                ...state,
                shoppingCart: minus
            };
        case 'removeProduct':
            const remove = state.shoppingCart.filter((item) =>
                item._id !== payload._id
            )
            return {
                ...state,
                shoppingCart: remove
            };
        case 'deleteCart':
            return {
                ...state,
                shoppingCart: payload
            };
    }
    return state;
}
/*======================
   GET PROFILE
=======================*/
export const profile = (state = { data: {}, error: "" }, { type, payload }) => {
    switch (type) {
        case 'successGetProfile':
            return payload;
        case 'failedGetProfile':
            return payload;
        default:
            return state;
    }
}