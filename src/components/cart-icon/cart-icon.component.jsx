
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";


import {CartIconContainer, ItemCount, ShoppingIcon  } from  './cart-icon.styles'

const CartIcon = () => {

    const dispatch = useDispatch();
    const  cartCount  = useSelector(selectCartCount);
    const  isCartOpen  = useSelector(selectIsCartOpen);

    //toggle dropdown
    const toogleIsCartOpen = () => dispatch( setIsCartOpen(!isCartOpen) );
        

    return (

        <CartIconContainer onClick={toogleIsCartOpen} >
            <ShoppingIcon className="shopping-icon"/>
            <ItemCount>{cartCount }</ItemCount>
        </CartIconContainer>
    )

}

export default CartIcon;

