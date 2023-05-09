import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import {Routes , Route} from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { setCategories } from '../../store/categories/categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';


const Shop = () => {
    const dispatch = useDispatch();


     //load categories useEffect 
  useEffect( () => {
    const getCategories = async () => {

        const categories = await getCategoriesAndDocuments('categories');
        dispatch( setCategories(categories) );
    }
    getCategories();

  },[]);


    return(
        <Routes>
            <Route index element={<CategoriesPreview />}></Route>
            {/* declaring the dynamic route */}
            <Route path=":category" element={ <Category />} ></Route>
        </Routes>
    )
}

export default Shop;
