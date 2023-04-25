
import { createContext,  useState } from "react"

import PRODUCTS from '../shop-data.json'


//initialiaze context to instanciate
export const ProductsContext = createContext({

    products : [],
    //setCurrentProduct : () => null
});

//allow access and modification of products 
export const ProductsProvider = ({children}) => {
    //use hook of useState to keep assign and keep track of values
    const [products, setProducts] = useState(PRODUCTS);

    const value = { products };
    return ( 

        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider> 
    )
}