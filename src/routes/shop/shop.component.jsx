import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


import {Routes , Route} from 'react-router-dom'
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import { fetchCategoriesStart } from '../../store/categories/categories.action';


const Shop = () => {
    const dispatch = useDispatch();


     //load categories useEffect 
  useEffect( () => {

        dispatch( fetchCategoriesStart());
   
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
