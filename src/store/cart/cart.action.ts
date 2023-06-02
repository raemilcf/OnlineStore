import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {  ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/reducer.util";
import { CategoryItems } from "../categories/categories.types";


//region -----------------------------------UTILITY----------------------------
//create new array with products 
const addCartItem = (cartItems : CartItem[], productToAdd : CategoryItems) : CartItem[] => {
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
const removerCartItem = ( cartItems : CartItem[], cartItemToRemove : CartItem) : CartItem[] => {

    //find the cart item to remove 
    const existingCartItem = cartItems.find((cartItem)=> 
        cartItem.id === cartItemToRemove.id
    )

    if( existingCartItem &&  existingCartItem.quantity ===1){

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
const clearCartItems = (cartItems : CartItem[], clearCartItem : CartItem) : CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== clearCartItem.id);

}
//end region -----------------------------------UTILITY----------------------------

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[] >;




export const setIsCartOpen = withMatcher((boolean: boolean) :SetIsCartOpen=> 
    createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, boolean)
    );


export const setCartItems = withMatcher( (cartItems: CartItem[]) : SetCartItems => 
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);
 
//add item to cart or add  quantity to item
export const addItemToCart =   (cartItems: CartItem[], productToAdd : CategoryItems)  => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
    }

//quit one pice of same product 
export const removeItemToCart = (cartItems : CartItem[], cartItemToRemove : CartItem) => {
    const newCartItems = removerCartItem(cartItems, cartItemToRemove);
    return setCartItems(newCartItems);
}
    
//clear the item  cart from checkout
export const clearItemFromCart = (cartItems : CartItem[], clearCartItem : CartItem) => {
    const newCartItems = clearCartItems(cartItems, clearCartItem);
    return setCartItems(newCartItems);
}


