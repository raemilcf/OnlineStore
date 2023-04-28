import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import { CheckoutItemContainer, Image, ImageContainer,Name, Quantity, Value,  Arrow, RemoveButton, Price } from './checkout-item.styles'


const CheckoutItem = ({ cartItem }) => {

    const {name, imageUrl, price, quantity } = cartItem;

    const {removeItemToCart, addItemToCart, clearItemFromCart } = useContext(CartContext);


    const removeItemHandler = () => {
        removeItemToCart(cartItem);
    }

    const addItemHandler = () => {
        addItemToCart(cartItem);
        
    }
    const clearItemHandler = () => {
        clearItemFromCart(cartItem);
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
};

export default CheckoutItem;