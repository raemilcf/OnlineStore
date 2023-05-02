import {createContext,  useEffect,  useReducer} from 'react';

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

//INITIALIZE CART WITH EMPTY ARRAY
const INITIAL_CART_VALUE = {
    cartItems:[],
    cartTotal:0,
    cartCount:0,
    isCartOpen: false
}

//constants values 
export const CART_ACTION_TYPES = {
    SET_CART_ITEMS : 'SET_CART_ITEMS' ,
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
    SET_CART_OPEN: 'SET_CART_OPEN'
}

//declare reducer
//reducer store only readeable values  
const cartReducer = (state , action) => {
    const { type, payload } = action;

    switch (type){
        case CART_ACTION_TYPES.SET_CART_ITEMS :
            return {
                ...state,
                cartItems : payload
            }
        case CART_ACTION_TYPES.SET_CART_COUNT:
            return {
                ...state,
                cartCount: payload
            }
        case CART_ACTION_TYPES.SET_CART_TOTAL:
            return{
                ...state,
                cartTotal: payload
            }
        case CART_ACTION_TYPES.SET_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        default: 
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}


//context to keep track of the dropdown cart 
export const CartProvider = ({children}) => {

   // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    //const [cartCount, setCartCount] = useState(0);
   // const [cartTotal, setCartTotal] = useState(0);

    const [ {cartItems, cartCount, cartTotal}, dispatch ] = useReducer(cartReducer, INITIAL_CART_VALUE);


    //update cart items 
    const setCartItems = (cartItems) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload : cartItems});
    }

    const setCartCount = (cartCount) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_COUNT, payload: cartCount});
    }

    const setCartTotal= (cartTotal) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_TOTAL, payload: cartTotal });
    }

    const setIsCartOpen = (isCartOpen) => {
       dispatch({type: CART_ACTION_TYPES.SET_CART_OPEN, payload: isCartOpen});
    }

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

    const updateCartItemsReducer = (newCartItems) => {

        /*
        dispatch new action with payload = {
            newCartItems,
            newCartCount,
            newCartTotal
        }
        
        */

    }


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

