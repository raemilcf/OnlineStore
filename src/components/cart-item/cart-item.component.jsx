import { CartItemContainer, ItemsDetails, Title , Image} from './cart-item.styles'

const CartItem =({cartItem}) => {

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