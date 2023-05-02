import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams} from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card.componet';
import { selectCategoriesMap } from '../../store/categories/categories.selector';

import {CategoryContainer, Title} from './category.styles'


const Category = () => {

    //get the value to use on url (userParams hooks allows to get some values )
    const {category} = useParams();

    const categoriesMap = useSelector(selectCategoriesMap);

    //get actual product from categoriesMap
    const [products, setProducts] = useState(categoriesMap[category]);

    //only change list of products showing if category or categoriesMap changes 
    useEffect(() => {
        setProducts(categoriesMap[category]);

    }, [category, categoriesMap]);


    //show only the all products that belong to one route or category
    return (
        <>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
            {products &&
                products.map((product) => <ProductCard key={product.id} product={product} />)
            }
            </CategoryContainer>
        </>
    )

}

export default Category;