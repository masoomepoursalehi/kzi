import axios from "axios";
/*======================
   CART
=======================*/
export const addToCart = (id) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`http://kzico.runflare.run/product/${id}`);

        dispatch({ type: 'successAddToCart', payload: { ...data, qty: 1 } })

        localStorage.setItem('shoppingCart', JSON.stringify(getState().cart.shoppingCart));
    } catch (error) {
        dispatch({ type: 'failedAddToCart', payload: { error: error.message } })
    }
}
/*======================
   PLUS PRODUCT
=======================*/
export const plusProduct = (item) => async (dispatch, getState) => {
    dispatch({
        type: 'plusProduct',
        payload: item
    });

    localStorage.setItem('shoppingCart', JSON.stringify(getState().cart.shoppingCart));
}
/*======================
   MINUS PRODUCT
=======================*/
export const minusProduct = (item) => async (dispatch, getState) => {
    dispatch({
        type: 'minusProduct',
        payload: item
    });

    localStorage.setItem('shoppingCart', JSON.stringify(getState().cart.shoppingCart));
}
/*======================
   REMOVE PRODUCT
=======================*/
export const removeProduct = (item) => async (dispatch, getState) => {
    dispatch({
        type: 'removeProduct',
        payload: item
    });

    localStorage.setItem('shoppingCart', JSON.stringify(getState().cart.shoppingCart));
}
/*======================
   DELETE CART
=======================*/
export const deleteCart = (item) => async (dispatch, getState) => {
    dispatch({
        type: 'deleteCart',
        payload: []
    });

    localStorage.setItem('shoppingCart', JSON.stringify(getState().cart.shoppingCart));
}
/*======================
    GET PROFILE
=======================*/
export const getProfile = ()=> async(dispatch,getState)=>{
    try {
        const {data} = await axios.get("http://kzico.runflare.run/user/profile",{
            headers: {
                authorization:
                  `Bearer ${localStorage.getItem('token')}`,
              },
        });
        dispatch({
            type:'successGetProfile',
            payload:{data:{...data},error:""} 
        });
    } catch (error) {
        dispatch({
            type:'failedGetProfile',
            payload:{data:{},error:error.response.data.message} 
        });
    }
};