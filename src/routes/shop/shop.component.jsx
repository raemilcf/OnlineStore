import { useContext } from "react";

import { ProductsContext } from "../../context/products.context";

import  ProductCard from "../../components/product-card/product-card.componet";

import './shop.styles.scss'

const Shop = () => {

    //must call same variable names from productsContext
    const { products } = useContext(ProductsContext);

    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
           

        </div>
    );
}

export default Shop;
