import {createContext,  useState} from 'react';

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
    return [...cartItems, { ...productToAdd, quantity : 1}];
}


export const CartContext = createContext({
    isCartOpen : false,
    setIsCartOpen : () => {},
    cartItems:[],
    addItemToCart: () => {}
});
//context to keep track of the dropdown cart 
export const CartProvider = ({children}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));

    }

    const value ={isCartOpen, setIsCartOpen, addItemToCart, cartItems };

    return (<CartContext.Provider value={value}>{children}</CartContext.Provider> )

}

