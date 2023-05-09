import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.util";


//region -----------------------------------UTILITY----------------------------
//create new array with products 
const addCartItem = (cartItems, productToAdd) => {
    //find if item exist
    const exist = cartItems.find(( item )=> item.id === productToAdd.id);

    if(exist){
        //if exist increment qty
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
                ? { ...cartItem, quantity : cartItem.quantity + 1 } 
                : cartItem
        );
    }

    //return new array modified 
    return  [...cartItems, { ...productToAdd, quantity : 1}];
}

//remover cart item 
const removerCartItem = ( cartItems, cartItemToRemove) => {

    //find the cart item to remove 
    const existingCartItem = cartItems.find((cartItem)=> 
        cartItem.id === cartItemToRemove.id
    )

    if(existingCartItem.quantity ===1){

        //only return the ones different to the id 
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    //return same item but reduce
    return cartItems.map((cartItem) => 
    cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity : cartItem.quantity - 1 } 
        : cartItem
);
}

//clear the full cart 
const clearCartItems = (cartItems, clearCartItem) => {
    return cartItems.filter(cartItem => cartItem.id !== clearCartItem.id);

}
//end region -----------------------------------UTILITY----------------------------

export const setIsCartOpen = (boolean) => 
    createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean);
 
//add item to cart or add  quantity to item
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction( CART_ACTION_TYPES.SET_CART_ITEMS,  newCartItems);
}

//quit one pice of same product 
export const removeItemToCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removerCartItem(cartItems, cartItemToRemove);
    return createAction( CART_ACTION_TYPES.SET_CART_ITEMS,  newCartItems);
}
    
//clear the item  cart from checkout
export const clearItemFromCart = (cartItems, clearCartItem) => {
    const newCartItems = clearCartItems(cartItems, clearCartItem);
    return createAction( CART_ACTION_TYPES.SET_CART_ITEMS,  newCartItems);
}


