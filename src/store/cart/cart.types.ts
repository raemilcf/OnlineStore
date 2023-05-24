

//change from type  to enum 

import { CategoryItems } from "../categories/categories.types";

export enum CART_ACTION_TYPES  {
    SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
    SET_CART_IS_OPEN = 'cart/SET_CART__IS_OPEN',
}

export type CartItem = CategoryItems & {
    quantity: number ;
}
// export const CART_ACTION_TYPES = {
//     SET_CART_ITEMS : 'cart/SET_CART_ITEMS',
//     SET_CART_IS_OPEN : 'cart/SET_CART__IS_OPEN',
// }