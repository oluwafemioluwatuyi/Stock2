import {useState, createContext, useEffect} from 'react';
import {  getCategoriesAndDocuments } from '../utils/firebase/firebaseutils.js';


export const CategoriesContext = createContext({
    categoriesMap: {},

});
export const  CategoriesProvider = ({children}) => {
    const [categoriesMap, setcategorieMap] = useState({});

    // useEffect(() =>{
    //     addCollectionAndDocument('categories', SHOP_DATA);

    // }, [])

    useEffect(() =>{
        const getCategoriesMap = async () =>{
        const categoryMap =  await  getCategoriesAndDocuments()
        console.log(categoryMap)
        setcategorieMap(categoryMap)
        }

        getCategoriesMap()
       
    }, []);

    const value = {categoriesMap}

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )

}