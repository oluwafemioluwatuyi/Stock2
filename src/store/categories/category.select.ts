import {createSelector} from 'reselect';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';
import { RootState } from "../store";

const selectCategoryReducer = (state:RootState):CategoriesState =>{
    console.log('selector 1 fire');
    return state.categories;
} 

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) =>{
        console.log('selector 1 fired');
        return categoriesSlice.categories;
    } 
);


export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories):CategoryMap=> {
        console.log('selector 2 fired');
       return categories.reduce((acc, category) =>{
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {} as CategoryMap);
        
    }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading

)
    
    



