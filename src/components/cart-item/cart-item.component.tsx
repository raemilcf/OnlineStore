import { FC , memo} from 'react';
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import { CartItemContainer, ItemsDetails, Title , Image} from './cart-item.styles'

type CartItemProps = {
    cartItem: TCartItem;
}
//use memo to avoid re-render of items everytime is added
const CartItem : FC<CartItemProps> =memo (({cartItem}) => {

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
);

export default CartItem;
