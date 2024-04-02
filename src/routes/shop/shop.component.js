import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
//import { getCategoriesAndDocuments } from '../../utils/firebase/firebaseutils';
import {useDispatch} from 'react-redux';
//import {setCategories} from '../../store/categories/category.action';
import { fetchCategoriesStart } from '../../store/categories/category.action';
import './shop.styles.scss'



const Shop = () => {

    const dispatch = useDispatch();
    // updated redux-saga for the middleware
    useEffect(() =>{
       dispatch(fetchCategoriesStart());
    }, []);
    
    return(
        <Routes>
            <Route index element = {<CategoriesPreview/>} />
            <Route path=':category' element = {<Category/>} />
        </Routes>
       
    )

}

export default Shop;