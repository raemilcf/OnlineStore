import { AnyAction } from "redux";

import {  CartItem } from "./cart.types";
import { setCartItems,  setIsCartOpen } from "./cart.action";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
}

export const CART_INITIAL_STATE : CartState = {
    cartItems:[],
    isCartOpen: false,
}

export const cartReducer = (
    state = CART_INITIAL_STATE , 
    action : AnyAction
) : CartState => {

    if(setIsCartOpen.match(action)){
        return{
            ...state,
            isCartOpen: action.payload
        }
    }

    if(setCartItems.match(action)){
        return {
            ...state,
            cartItems: action.payload
        }
    }

    return state;

    // const { type, payload } = action;

    // switch (type){
    //     case CART_ACTION_TYPES.SET_CART_ITEMS :
    //         return {
    //             ...state,
    //             cartItems: payload
    //         }
      
    //     case CART_ACTION_TYPES.SET_CART_IS_OPEN:
    //         return{
    //             ...state,
    //             isCartOpen: payload
    //         }
    //     default: 
    //         return state;
    // }
}
