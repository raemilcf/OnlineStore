import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../context/cart.context";


import './cart-icon.styles.scss'

const CartIcon = () => {

    const {isCartOpen, setIsCartOpen} = useContext(CartContext);

    //toggle dropdown
    const toogleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    }

    return (

        <div onClick={toogleIsCartOpen} className="cart-icon-container">
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">0</span>
        </div>
    )

}

export default CartIcon;