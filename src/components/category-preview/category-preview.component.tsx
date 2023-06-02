import { FC } from 'react';
import { CategoryItems } from '../../store/categories/categories.types';
import ProductCard from '../product-card/product-card.componet';
import { CategoryPreviewContainer, Preview, Title } from  './category-preview.styels'

type CategoryPreviewProps ={
    title : string;
    products: CategoryItems[];
}

const CategoryPreview : FC<CategoryPreviewProps> = ({ title, products}) => {
   
    return (

        <CategoryPreviewContainer>
        <h2>
            <Title to={title}>{title.toUpperCase()} </Title>
            {/* <span className='title' onClick={navigateToCategory}>{title.toUpperCase()}</span> */}
        </h2>
        <Preview>
            {
                products.filter((_, idx) => idx < 4)
                .map((product) => 
                <ProductCard key={product.id} product={product}/>)
            }
        </Preview>

        </CategoryPreviewContainer>
    );

}

export default CategoryPreview;