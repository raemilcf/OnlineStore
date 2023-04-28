import ProductCard from '../product-card/product-card.componet';
import { CategoryPreviewContainer, Preview, Title } from  './category-preview.styels'


const CategoryPreview = ({ title, products}) => {
   
    return (

        <CategoryPreviewContainer>
        <h2>
            <Title to={title}>{title.toUpperCase()} </Title>
            {/* <span className='title' onClick={navigateToCategory}>{title.toUpperCase()}</span> */}
        </h2>
        <Preview>
            {
                products.filter( (_, index) => index < 4)
                .map((product) => 
                <ProductCard key={product.id} product={product}/>)
            }
        </Preview>

        </CategoryPreviewContainer>
    );

}

export default CategoryPreview;