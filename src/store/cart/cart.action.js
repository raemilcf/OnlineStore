import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";

export const setCartItems = ( cartItems) => 
    createAction(CART_ACTION_TYPES.SET_CART, cartItems);

