import { FC } from 'react';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import { CartItemContainer, ItemsDetails, Title , Image} from './cart-item.styles'

type CartItemProps = {
    cartItem: TCartItem;
}

const CartItem : FC<CartItemProps> =({cartItem}) => {

    const { name, imageUrl, price, quantity } = cartItem;
    return(
        <CartItemContainer>
             <Image src={imageUrl} alt={name}/>
            <ItemsDetails>
                <Title>{name}</Title>
                <Title>{quantity} x ${price}</Title>
            </ItemsDetails>
        </CartItemContainer>
    )

}

export default CartItem;
