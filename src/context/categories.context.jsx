
import { createContext,  useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils'

//import SHOP_DATA from '../shop-data.js'


//initialiaze context to instanciate
export const CategoriesContext = createContext({

    categoriesMap : [],
    //setCurrentProduct : () => null
});

//allow access and modification of products 
export const CategoriesProvider = ({children}) => {
    //use hook of useState to keep assign and keep track of values
    const [categoriesMap, setCategoriesMap] = useState({});

    //add collection documentos to fierebase 
    //once the useEffect runs first time and put all the data in firestore, theres no need to run again, unless you want to change or update the collection
    // useEffect( () => {
    //     addCollectionAndDocuments("categories", SHOP_DATA);
    // },[]);//no callback

    useEffect( () => {
        const getCategories = async () => {

            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategories();

    },[]);



    const value = { categoriesMap };
    return ( 

        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider> 
    )
}