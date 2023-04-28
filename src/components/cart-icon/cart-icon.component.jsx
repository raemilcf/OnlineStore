import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";


import {CartIconContainer, ItemCount, ShoppingIcons  } from  './cart-icon.styles'

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    //toggle dropdown
    const toogleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (

        <CartIconContainer onClick={toogleIsCartOpen} >
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{cartCount }</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon;