
import { createContext,  useState, useEffect } from "react"
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils'

//import SHOP_DATA from '../shop-data.js'


//initialiaze context to instanciate
export const ProductsContext = createContext({

    products : [],
    //setCurrentProduct : () => null
});

//allow access and modification of products 
export const ProductsProvider = ({children}) => {
    //use hook of useState to keep assign and keep track of values
    const [products, setProducts] = useState([]);

    //add collection documentos to fierebase 
    //once the useEffect runs first time and put all the data in firestore, theres no need to run again, unless you want to change or update the collection
    // useEffect( () => {
    //     addCollectionAndDocuments("categories", SHOP_DATA);
    // },[]);//no callback



    const value = { products };
    return ( 

        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider> 
    )
}