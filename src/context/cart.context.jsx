import {createContext, useReducer} from 'react';

import { createAction } from '../utils/reducer/reducer.util';

// //create new array with products 
// const addCartItem = (cartItems, productToAdd) => {
//     //find if item exist
//     const exist = cartItems.find(( item )=> item.id === productToAdd.id);

//     if(exist){
//         //if exist increment qty
//         return cartItems.map((cartItem) => 
//             cartItem.id === productToAdd.id 
//                 ? { ...cartItem, quantity : cartItem.quantity + 1 } 
//                 : cartItem
//         );
//     }

//     //return new array modified 
//     return  [...cartItems, { ...productToAdd, quantity : 1}];
// }

// //remover cart item 
// const removerCartItem = ( cartItems, cartItemToRemove) => {

//     //find the cart item to remove 
//     const existingCartItem = cartItems.find((cartItem)=> 
//         cartItem.id === cartItemToRemove.id
//     )

//     if(existingCartItem.quantity ===1){

//         //only return the ones different to the id 
//         return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
//     }

//     //return same item but reduce
//     return cartItems.map((cartItem) => 
//     cartItem.id === cartItemToRemove.id 
//         ? { ...cartItem, quantity : cartItem.quantity - 1 } 
//         : cartItem
// );
// }

// //clear the full cart 
// const clearCartItems = (cartItems, clearCartItem) => {
//     return cartItems.filter(cartItem => cartItem.id !== clearCartItem.id);

// }


// export const CartContext = createContext({
//     isCartOpen : false,
//     setIsCartOpen : () => {},
//     cartItems:[],
//     addItemToCart: () => {},
//     removeItemFromCart : () => {},
//     clearItemFromCart : () => {},
//     cartCount : 0,
//     cartTotal: 0
// });

//INITIALIZE CART WITH EMPTY ARRAY
// const INITIAL_CART_VALUE = {
//     cartItems:[],
//     cartTotal:0,
//     cartCount:0,
//     isCartOpen: false
// }

//constants values 
// export const CART_ACTION_TYPES = {
//     SET_CART_ITEMS : 'SET_CART_ITEMS' ,
//     SET_CART_COUNT: 'SET_CART_COUNT',
//     SET_CART_TOTAL: 'SET_CART_TOTAL',
//     SET_CART_OPEN: 'SET_CART_OPEN'
// }

//declare reducer
//reducer store only readeable values  
// const cartReducer = (state , action) => {
//     const { type, payload } = action;

//     switch (type){
//         case CART_ACTION_TYPES.SET_CART_ITEMS :
//             return {
//                 ...state,
//                 ...payload
//             }
      
//         case CART_ACTION_TYPES.SET_CART_OPEN:
//             return{
//                 ...state,
//                 isCartOpen: payload
//             }
//         default: 
//             throw new Error(`Unhandled type ${type} in cartReducer`);
//     }
// }


// //context to keep track of the dropdown cart 
// export const CartProvider = ({children}) => {

//     const [ {cartItems, cartCount, cartTotal, isCartOpen} , dispatch ] = useReducer(cartReducer, INITIAL_CART_VALUE);

//     //update cartItems, cartcount and cartTotal
//     //when one update need to modify multiple values 
//     const updateCartItemsReducer = (newCartItems) => {

        // const newCartCount = newCartItems.reduce(
        //     (accumulator, currentValue) => accumulator + currentValue.quantity,
        //     0
        // );

        // const newCartTotal = newCartItems.reduce(
        //     (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.price),
        //     0
        // );

    //     dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount} ));
    //     /*
    //     dispatch new action with payload = {
    //         newCartItems,
    //         newCartCount,
    //         newCartTotal
    //     }
    //     */
    // }
    // //update cart items 
    // const setIsCartOpen = (isCartOpen) => {
    //     dispatch(createAction(CART_ACTION_TYPES.SET_CART_OPEN, isCartOpen));
    //  }
 
    // //add item to cart or add  quantity to item
    // const addItemToCart = (productToAdd) => {
    //     const newCartItems = addCartItem(cartItems, productToAdd);
    //     updateCartItemsReducer(newCartItems);
    // }

    // //quit one pice of same product 
    // const removeItemToCart = (cartItemToRemove) => {
    //     const newCartItems = removerCartItem(cartItems, cartItemToRemove);
    //     updateCartItemsReducer(newCartItems);
    // }
    
    // //clear the item  cart from checkout
    // const clearItemFromCart = (clearCartItem) => {
    //     const newCartItems = clearCartItems(cartItems, clearCartItem);
    //     updateCartItemsReducer(newCartItems);
    // }

//     const value ={
//         isCartOpen,
//         setIsCartOpen, 
//         addItemToCart, 
//         cartItems, 
//         cartCount, 
//         removeItemToCart, 
//         clearItemFromCart, 
//         cartTotal 
//     };

//     return (<CartContext.Provider value={value}>{children}</CartContext.Provider> )

// }

