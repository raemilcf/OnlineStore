import { useSelector } from "react-redux";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {

    //must call same variable names from productsContext
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading)
   
    // only shows the first 4 elements of a category
    return (//declare a fragment <> </>
        <> 
            { isLoading ? <Spinner/> :
                (
                    Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        
                        <CategoryPreview key={title} title={title} products = {products} />
                    )
                }
                )
                )
                
            }
        </> 
         
    );
}

export default CategoriesPreview;
