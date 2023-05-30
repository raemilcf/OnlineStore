import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';
import { CheckoutItemContainer, Image, ImageContainer,Name, Quantity, Value,  Arrow, RemoveButton, Price } from './checkout-item.styles'

type CheckoutItemProps ={
    cartItem : CartItem;
}

const CheckoutItem : FC <CheckoutItemProps>= memo(({ cartItem }) => {

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const {name, imageUrl, price, quantity } = cartItem;

    const removeItemHandler = () => {
       dispatch(removeItemToCart(cartItems, cartItem));
    }

    const addItemHandler = () => {
        dispatch(addItemToCart(cartItems, cartItem));
        
    }
    const clearItemHandler = () => {
        dispatch(clearItemFromCart(cartItems, cartItem));
    }

    return (

        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <Name>{name}</Name>

            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
});

export default CheckoutItem;