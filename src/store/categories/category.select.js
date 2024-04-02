import {createSelector} from 'reselect';

const selectCategoryReducer = (state) =>{
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
    (categories)=> {
        console.log('selector 2 fired');
       return categories.reduce((acc, category) =>{
            const {title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, []);
    }
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading

)
    
    



