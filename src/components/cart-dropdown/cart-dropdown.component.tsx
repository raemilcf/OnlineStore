import { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button from '../button/button.component';

import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, CartItems, EmptyMessage } from  './cart-dropdown.styles'

const CartDropdown = () => {
    const  cartItems  = useSelector(selectCartItems);
    const navigate = useNavigate();

    //when re-render it will initialize al variables and fuctions (time, memory consuming)

    //use callback hook 
    const goToCheckoutHandler =  useCallback( () => {//memoize function 
        navigate('/checkout');//never really  changing 
    }, [] );// only is call if any object or value inside the array changes [] 

    return (

        <CartDropdownContainer>
        <CartItems>
            {
                cartItems.length ? 
                cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}/>
                )) :
                (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
            }
        </CartItems>
        <Button onClick={goToCheckoutHandler} > GO TO CHECKOUT </Button>

        </CartDropdownContainer>
    )
}


export default CartDropdown;