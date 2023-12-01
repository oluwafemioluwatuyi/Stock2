import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebaseutils';

import {useDispatch} from 'react-redux';
import {setCategoriesMap} from '../../store/categories/category.action';
import './shop.styles.scss'



const Shop = () => {

    const dispatch = useDispatch

    useEffect(() =>{
        const getCategoriesMap = async () =>{
        const categoryMap =  await  getCategoriesAndDocuments()
        console.log(categoryMap)
       dispatch(setCategoriesMap(categoryMap))
        }

        getCategoriesMap()
       
    }, []);
    
    return(
        <Routes>
            <Route index element = {<CategoriesPreview/>} />
            <Route path=':category' element = {<Category/>} />
        </Routes>
       
    )

}

export default Shop;