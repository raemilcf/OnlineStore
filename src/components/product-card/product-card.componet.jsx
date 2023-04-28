import { useContext } from 'react';

import Button from '../button/button.component';
import { CartContext } from '../../context/cart.context';

import {ProductCartContainer, Image, Footer, Buttons, Name, Price } from  './product-card.styles'


const ProductCard =({product}) => {

    const { name, price, imageUrl } = product;
    const { addItemToCart  } = useContext(CartContext);

    const addProductToCart = () => { addItemToCart(product); }
 
 return (
    <ProductCartContainer>
        <Image src={imageUrl} alt={`${name}`} />
        <Footer>
            <Name>{name}</Name>
            <Price className='price'>{price}</Price>
        </Footer>
        <Button   buttonType='inverted' onClick={addProductToCart} > Add to cart</Button>
    </ProductCartContainer>
 )
    
}


export default ProductCard;