import {takeLatest, all, call, put} from 'typed-redux-saga/macro';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebaseutils';

import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';

import { CATEGORIES_ACTION_TYPES } from './category.types';




export function* fetchCategoriesAsync(){
    try{
        const categoriesArray = yield* call(getCategoriesAndDocuments, 'categories');
        console.log(categoriesArray);
        //use put instead of dispatch
       yield* put(fetchCategoriesSuccess(categoriesArray));
    }catch(error){
        yield* put(fetchCategoriesFailed(error as Error));
        console.log(fetchCategoriesFailed)
    }
}

export function* onFetchCategories(){
    // whenever we take latest of the fetch_categories_staet, fetchCategoriesAsync is initialize
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,fetchCategoriesAsync)
}

export function* categoriesSaga(){
    yield all([call(onFetchCategories)]);
}