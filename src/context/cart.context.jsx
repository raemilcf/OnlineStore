import {createContext,  useEffect,  useState} from 'react';

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


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : () => {},
    cartItems:[],
    addItemToCart: () => {},
    removeItemFromCart : () => {},
    clearItemFromCart : () => {},
    cartCount : 0,
    cartTotal: 0
});
//context to keep track of the dropdown cart 
export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);


    //update state of cart items and quantity
    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (accumulator, currentValue) => accumulator + currentValue.quantity,
            0
        );

        setCartCount(newCartCount);
    },[cartItems]);

    //update checkout total
    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.price),
            0
        );

        setCartTotal(newCartTotal);
    },[cartItems]);

    //add item to cart or add  quantity to item
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }

    //quit one pice of same product 
    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removerCartItem(cartItems, cartItemToRemove));

    }
    
    //clear the item  cart from checkout
    const clearItemFromCart = (clearCartItem) => {
        setCartItems(clearCartItems(cartItems, clearCartItem));

    }

    const value ={
        isCartOpen,
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemToCart, 
        clearItemFromCart, 
        cartTotal 
    };

    return (<CartContext.Provider value={value}>{children}</CartContext.Provider> )

}

