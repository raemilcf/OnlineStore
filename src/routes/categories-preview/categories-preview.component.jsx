import {  useContext } from "react";

import { CategoriesContext } from "../../context/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {

    //must call same variable names from productsContext
    const { categoriesMap } = useContext(CategoriesContext);
   
    // only shows the first 4 elements of a category
    return (//declare a fragment <> </>
        <> 
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        
                        <CategoryPreview key={title} title={title} products = {products} />
                    )
                }
                )
            }
        </> 
         
    );
}

export default CategoriesPreview;
