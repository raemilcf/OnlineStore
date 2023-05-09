import { CART_ACTION_TYPES } from "./cart.types";

export const CART_INITIAL_STATE = {
    cartItems:[],
    cartTotal:0,
    cartCount:0,
    isCartOpen: false
}

export const cartReducer = (
    state = CART_INITIAL_STATE, 
    action = {}
    ) => {
        const { type, payload } = action;

        switch (type){
            case CART_ACTION_TYPES.SET_CART:
                return { ...state , cartItems: payload };
            default: 
                return state;
        }

}


