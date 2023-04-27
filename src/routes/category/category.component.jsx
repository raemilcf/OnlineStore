import { useContext, useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.componet';

import { CategoriesContext } from '../../context/categories.context';

import './category.styles.scss'


const Category = () => {

    //get the value to use on url (userParams hooks allows to get some values )
    const {category} = useParams();

    const {categoriesMap} = useContext(CategoriesContext);

    //get actual product from categoriesMap
    const [products, setProducts] = useState(categoriesMap[category]);

    //only change list of products showing if category or categoriesMap changes 
    useEffect(() => {
        setProducts(categoriesMap[category]);

    }, [category, categoriesMap]);


    //show only the all products that belong to one route or category
    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-container'>
            {products &&
                products.map((product) => <ProductCard key={product.id} product={product} />)
            }
            </div>

        </>
       
    )

}

export default Category;